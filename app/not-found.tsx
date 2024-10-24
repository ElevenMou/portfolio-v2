import Link from "next/link";

export default function NotFound() {
  return (
    <div className="main-content page">
      <div>
        <h1>Page Not Found</h1>
        <p>The page you are looking for could not be found.</p>
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
}
