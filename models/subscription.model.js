import mongoose from 'mongoose';

/*
Defining our "enums" for Subscription Model
- Traditional enums are not available in javascript, so we use objects to define constants.
- To unpack the values, we can use Object.values(CONST_VARIABLE) to get an array of the enum values.
*/

const CURRENCIES = {
  USD: 'USD',
  SGD: 'SGD',
  EUR: 'EUR',
  GBP: 'GBP',
  CAD: 'CAD',
  AUD: 'AUD',
  JPY: 'JPY'
};

const FREQUENCIES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};

const CATEGORIES = {
  SPORTS: 'sports',
  NEWS: 'news',
  ENTERTAINMENT: 'entertainment',
  EDUCATION: 'education',
  LIFESTYLE: 'lifestyle',
  TECHNOLOGY: 'technology',
  HEALTH: 'health',
  OTHERS: 'others'
};

const STATUSES = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired'
};

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription Name is required'],
      trim: true,
      minLength: 2,
      maxLength: 100
    },
    price: {
      type: Number,
      required: [true, 'Subscription Price is required'],
      min: [0, 'Subscription Price must be greater than 0']
    },
    currency: {
      type: String,
      enum: Object.values(CURRENCIES),
      default: 'SGD'
    },
    frequency: {
      type: String,
      enum: Object.values(FREQUENCIES)
    },
    category: {
      type: String,
      enum: Object.values(CATEGORIES)
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: Object.values(STATUSES),
      default: 'active'
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: value => value <= new Date(),
        message: 'Subscription Start Date must be in the past'
      }
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: 'Subscription Renewal Date must be after Start Date'
      }
    },
    //reference to Users
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true // Optimize queries by indexing the user field
    }
  },
  {
    timestamps: true
  }
);

// Auto-calculate renewal date and adjust sestatus before saving
subscriptionSchema.pre('save', function (next) {
  // Automatically set renewal date
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // Automatically set status to 'expired' if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
