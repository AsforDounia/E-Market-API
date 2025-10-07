import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    deletedAt: { type: Date, default: null }
}, { collection: 'product_categories', timestamps: true });

export default mongoose.model('ProductCategory', ProductCategorySchema);
