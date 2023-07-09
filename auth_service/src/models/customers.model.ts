import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ICustomer } from '@interfaces/customers.interface';

const customerSchema: Schema<ICustomer> = new Schema<ICustomer>(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/-/g, ''),
      alias: 'customerId',
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'customers',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

customerSchema.set('toJSON', {
  virtuals: true,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

customerSchema.pre('save', function (next) {
  this.passwordConfirm = undefined;
  next();
});

const Customer = model<ICustomer>('Customer', customerSchema);
export default Customer;
