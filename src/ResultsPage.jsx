import { Link } from "react-router-dom";

export default function ResultsPage() {

    return (
        <>
        <h2>ResultsPage</h2>
        <Link to="/">
            <img 
            src="/assets/back.svg"
            width="24px"
            height="24px" 
            alt="back arrow" 
            className="back"/>
        </Link>
        </>
    )
}