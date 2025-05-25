import './footer.css'

export default function Footer() {
    return (
        <footer className="footer">
        <div className="footer-content">
            <p className="footer-copy">&copy; {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.</p>
            <p className="footer-company">Desenvolvido por Seu Nome</p>
        </div>
        </footer>
    );
}