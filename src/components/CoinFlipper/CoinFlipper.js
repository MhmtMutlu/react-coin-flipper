import React, { Component } from "react";
import Coin from "../Coin/Coin";
import "./CoinFlipper.css";

class CoinFlipper extends Component {
  constructor(props) {
    super(props);
    // State üzerinde paranın başlangıçtaki durumunu veriyoruz, başlangıçta "tura" olsun.
    // Daha sonra şu anda paranın dönüp dönmeme durumunu da veriyoruz, başlangıçta para atılmamış olduğundan "false" olarak verdik.
    this.state = {
      side: "tura",
      flipping: false,
      flipCount: 0,
      turaCount: 0,
      yaziCount: 0,
    };
  }
  handleClick = () => {
    // "At!" butonuna tıkladığımızda paranın dönmesini istiyoruz, bu yüzden "flipping" durumunu "true" yapıyoruz.
    // Ardından random bir şekilde yazı veya tura geleceğini belirlemek için Math.random() metotunu çağırıyoruz ve 0.5 değerinden
    // küçük sayıları "tura", büyük sayıları "yazi" yazılarak state'e kayıt ediyoruz. Aynı anda turaCount ve yaziCount değerlerini
    // artırmak için buradaki if bloğunu kullanmış olduk.
    this.setState(
        { flipping: true }, 
        () => {
        if(Math.random() < 0.5) {
            this.setState(prevState => {return {turaCount: prevState.turaCount + 1, side: "tura"}})
        } else {
            this.setState(prevState => {return {yaziCount: prevState.yaziCount + 1, side: "yazi"}})
        }
        }, 
        {flipCount: this.state.flipCount += 1},
    );
    // 1 saniye kadar dönmesi yeterli, bu yüzden 1 saniye sonra "flipping" durmunu tekrar "false" yapıyoruz.
    setTimeout(() => this.setState({ flipping: false }), 1000);
  };

  render() {
    return (
      <div className="CoinFlipper">
        <h1>Yazı mı Tura mı?</h1> 
        <Coin side={this.state.side} flipping={this.state.flipping} />
        <button onClick={this.handleClick}>Fırlat!</button>
        <p>
          Toplam
          <strong> {this.state.flipCount} </strong> atıştan
          <strong> {this.state.turaCount} </strong> tanesi tura,
          <strong> {this.state.yaziCount} </strong> tanesi yazı geldi.
        </p>
      </div>
    );
  }
}

export default CoinFlipper;