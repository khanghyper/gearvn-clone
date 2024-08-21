import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as AliasSchema, Types } from 'mongoose';

/** -------------- UserSchema --------------- */
export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'Users' })
export class User {
  @Prop({
    type: String,
    required: true
  })
  name: string;

  @Prop({
    type: String,
    required: true
  })
  password: string;

  @Prop({
    type: String,
    required: true
  })
  email: string;

  @Prop({
    type: String,
  })
  refreshToken: string;

  @Prop({
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'ADMIN'
  })
  role: string;

  @Prop({
    type: Boolean,
    default: false
  })
  isActive: false

  @Prop()
  codeId: string

  @Prop()
  codeExpired: Date
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ name: 'text' });

export { UserSchema };

/** -------------- RoleSchema--------------- */

export type RoleDocument = Role & Document;

@Schema({
  timestamps: true,
  collection: 'Roles',
})
export class Role {
  @Prop()
  title: string;

  @Prop([{ type: AliasSchema.Types.ObjectId, ref: 'Permission' }])
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);

/** -------------- PermissionSchema --------------- */

export type PermissionDocument = Permission & Document;

@Schema({
  timestamps: true,
  collection: 'Permissions',
})
export class Permission {
  @Prop()
  url: string;

  @Prop()
  description: string;

  @Prop([{ type: AliasSchema.Types.ObjectId, ref: 'Role' }])
  roles: Role[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
