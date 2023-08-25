import logoCorner from "../assets/images/discount.svg";
function LogoBadge(){
    return (
    <section className="logo badge">
    <img src={logoCorner} className="logo-corner" alt="corners"/>
    <p>ЦЬОГО ТИЖНЯ НА ВСЕ</p>
    <hr/>
    <p className="percent">-20%</p>
    </section>
)
}

export default LogoBadge;