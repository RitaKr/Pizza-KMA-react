import logoCorner from "../assets/images/discount.svg";
import React from "react";

function LogoBadge(){
    const [visible, setVisible] = React.useState(true);

    return (
    <section className={`logo badge ${visible ? '':'hidden-badge'}`} onClick={(e)=>{console.log('badge click'); setVisible(!visible)}}>
    <img src={logoCorner} className="logo-corner " alt="corners"/>
    <p>ЦЬОГО ТИЖНЯ НА ВСЕ</p>
    <hr/>
    <p className="percent">-20%</p>
    </section>
)
}

export default LogoBadge;