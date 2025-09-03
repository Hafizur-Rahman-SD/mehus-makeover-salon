export default function Footer() {
return (
<footer className="bg-white border-top py-4 mt-5">
<div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
<div className="small">© {new Date().getFullYear()} Mehus Makeover. All rights reserved.</div>
<div className="d-flex gap-3 small">
<a className="link-secondary" href="/privacy">Privacy</a>
<a className="link-secondary" href="/terms">Terms</a>
</div>
</div>
</footer>
);
}