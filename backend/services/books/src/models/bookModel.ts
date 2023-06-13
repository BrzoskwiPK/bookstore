import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    description: string;
    price: number;
    availability: boolean;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true },
});

export default mongoose.model<IBook>('Book', BookSchema);
