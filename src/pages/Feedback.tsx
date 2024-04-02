import { useState } from "react";
import { db } from "../libs/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "flowbite-react";
import { ReviewData } from "../hooks/GetReviews";
import { Reviews } from "../components/Reviews";

const Feedback = () => {
    const [review, setReview] = useState<ReviewData>({
        name: "",
        email: "",
        comments: "",
        rating: 0 // Rating stored as a number
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        // If the name is rating, parse the value as an integer
        const newValue = name === 'rating' ? parseInt(value, 10) : value;
        setReview({ ...review, [name]: newValue });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "feedback"), review);
            alert("Review added successfully");
            setReview({
                name: "",
                email: "",
                comments: "",
                rating: 0 // Reset rating to 0 after submission
            });
        } catch (error) {
            console.error("Error adding review: ", error);
            alert("Error adding review: " + error);
        }
    };

    return (
        <>
        <div className="container mx-auto my-10 rounded-xl py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
            <h2 className="text-4xl font-medium mt-10 text-black text-center">Add Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                            Your Name
                        </label>
                        <input className=" shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" name="name" value={review.name} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex flex-wrap mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Your Email
                        </label>
                        <input className=" shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" name="email" value={review.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex flex-wrap mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="rating">
                            Rating
                        </label>
                        <select className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="rating" name="rating" value={review.rating} onChange={handleChange}>
                            <option value="0">0 (Anna Would enjoy)</option>
                            <option value="1">1 (Nikovits said its trivial)</option>
                            <option value="2">2 (Borsi said its okay)</option>
                            <option value="3">3 (Asvanyi Tibor Laughed at himself)</option>
                            <option value="4">4 (Bognar Gergo said Hmmm)</option>
                            <option value="5">5 (Szabo Laszlo approved)</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="comments">
                            Comments
                        </label>
                        <textarea className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="comments" name="comments" rows={3} value={review.comments} onChange={handleChange}></textarea>
                    </div>
                </div>
                <Button className="mx-auto" pill color="failure" type="submit">
                    Add Review
                </Button>
            </form>
        </div>
            <Reviews />
            </>
        
    );
}

export default Feedback;
