import { Button } from 'react-bootstrap';

export default function NotFound() {
    return(
        <>
            <div className="container my-5">
    <div className="row">
        <div className="col-md-12">
            <div className="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div className="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div className="error-actions">
                <Button className="btn-lg mx-3" variant="dark">Take me home</Button>
                <Button className="btn-lg" variant="dark">Contact Support</Button>
                </div>
            </div>
        </div>
    </div>
</div>

        </>
    );
}