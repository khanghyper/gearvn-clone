import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Category } from 'src/category/category.model';
import { Error, FlattenMaps, Model, Types } from 'mongoose';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    private readonly eventEmitter: EventEmitter2,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  createCategory = async (payload: any, file: Express.Multer.File) => {
    // if (!file) throw new BadRequestException();

    const foundCategory = await this.categoryModel.findOne({ name: payload.name });
    if (foundCategory) throw new UnprocessableEntityException({
      errors: [
        {
          field: 'name',
          message: 'Tên danh mục đã tồn tại'
        }
      ],
      message: 'Entity error',
      statusCode: 422
    });

    const createCategoryRes = await this.categoryModel.create({
      ...payload,
      slug: this.transToSlug(payload.name),
    })

    // this.eventEmitter.emit('category.created', { _id: createCategoryRes._id, image: file })

    return {
      message: 'OK',
      data: createCategoryRes
    }
  }

  findAll = async ({
    parentId,
    pageSize = '10',
    pageIndex = '0'
  }: { parentId?: string, pageSize?: string, pageIndex?: string }) => {

    const a = (parentId || parentId === '') ? { parentId: parentId !== '' ? parentId : undefined } : {}
    const foundCategories = await this.categoryModel.find(
      // { parentId: parentId ? parentId : undefined }
      a
    )
      .select('-createdAt -__v -updatedAt').lean()
      .populate('parentId', '-createdAt -__v -updatedAt')
      .limit(+pageSize)
      .skip(+pageIndex * (+pageSize))

    const count = (await this.categoryModel.find({})).length;
    const pageCount = +pageSize >= count ? 1 : (count % +pageSize === 0 ? count / +pageSize : Math.ceil(count / +pageSize));

    // await this.categoryModel.updateMany({parentId: '66bccddd2cd19298947c7b9b'}, {parentId: '66bccd792cd19298947c7b97'})

    return {
      message: 'OK',
      data: foundCategories,
      pageInfo: {
        pageSize: +pageSize,
        pageIndex: +pageIndex,
        pageCount,
        pagePrevious: (+pageIndex > 0) ? +pageIndex - 1 : undefined,
        pageNext: (+pageIndex + 1 < pageCount) ? +pageIndex + 1 : undefined
      },
      count
    }
  }

  findv1 = async () => {
    try {
      const mainCategories = await this.categoryModel.find({ parentId: undefined })
        .select('-__v -createdAt -updatedAt')
        .lean();

      const result = []

      const abx = async (categories: (FlattenMaps<Category> & {
        _id: Types.ObjectId;
      })[]) => {
        const a: any[] = [...categories.map(item => ({ ...item, categories: [] }))];

        for (let item of a) {
          const foo = await this.categoryModel.find({ parentId: item._id.toString() })
            .select('-__v -createdAt -updatedAt')
            .lean();
          const bar = await abx(foo);
          item.categories = [...bar];
        }
        return a;
      }
      const c = await abx(mainCategories)
      return {
        message: 'OK',
        data: c
      }

    } catch (error) {

    }
  }

  findById = async (id) => {
    try {
      const response = await this.categoryModel.findById(id);
      return {
        message: 'OK',
        data: response
      }
    } catch (error) {
      console.log(error);
    }
  }

  async buildCategoryTree(categories) {
    const result = []


    categories.forEach((item, index) => {
      if (!item.parentId) {
        let newCategory = { ...item, categories: [] }
        result.push(newCategory)
      } else {
        let index = result.findIndex(rs => rs._id.toString() === item.parentId.toString());
        if (index !== -1) {
          result[index].categories.push(item)
        }
      }
    })
    return result;
  }

  @OnEvent('category.created')
  async eventUploadImage(payload) {
    try {
      const uploadFileRes = await this.cloudinaryService.uploadFile(payload.image);
      await this.categoryModel.findByIdAndUpdate(payload._id, {
        image: uploadFileRes.url
      })
    } catch (error) {
      console.log(error);
    }
  }

  transToSlug(name) {
    return slugify(name, {
      replacement: '-',
      remove: undefined,
      lower: true,
      strict: true,
      locale: 'vi',
      trim: true
    })
  }
}
