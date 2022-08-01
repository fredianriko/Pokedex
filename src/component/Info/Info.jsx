import React from "react";
import "./info.scss";

function Info({ data, dataNow }) {
  //static state
  const pokemonImage = dataNow ? dataNow?.sprites.front_default : data?.sprites.front_default;
  const pokemonName = dataNow ? dataNow?.name.toUpperCase() : data?.name.toUpperCase();
  const pokemonHp = dataNow ? dataNow?.stats[0].base_stat : data?.stats[0].base_stat;
  const pokemonAttack = dataNow ? dataNow?.stats[1].base_stat : data?.stats[2].base_stat;
  const pokemonDefense = dataNow ? dataNow?.stats[2].base_stat : data?.stats[2].base_stat;
  const pokemonSpecialAttack = dataNow ? dataNow?.stats[3].base_stat : data?.stats[3].base_stat;
  const pokemonSpecialDefense = dataNow ? dataNow?.stats[4].base_stat : data?.stats[4].base_stat;
  const pokemonSpeed = dataNow ? dataNow?.stats[5].base_stat : data?.stats[5].base_stat;

  return (
    <div className="information">
      <div className="information-container">
        <div className="image">
          <img src={pokemonImage} alt="" />
        </div>
        <div className="name">
          <h2>{pokemonName}</h2>
        </div>
        <div className="stats">
          <h2>Basic Stats</h2>
        </div>
        <div className="basic-stats">
          <h2>
            Hp <span style={{ marginLeft: "135px" }}>:</span> {pokemonHp}
          </h2>
          <h2>
            Attack <span style={{ marginLeft: "99px" }}>:</span> {pokemonAttack}
          </h2>
          <h2>
            Defense <span style={{ marginLeft: "89px" }}>:</span> {pokemonDefense}
          </h2>
          <h2>
            Special-Attack <span style={{ marginLeft: "19px" }}>:</span> {pokemonSpecialAttack}
          </h2>
          <h2>
            Special-Defense <span style={{ marginLeft: "9px" }}>:</span> {pokemonSpecialDefense}
          </h2>
          <h2>
            Speed<span style={{ marginLeft: "116px" }}>:</span> {pokemonSpeed}
          </h2>
        </div>
      </div>
      <div className="additional-information">
        <div className="abilitites">Abilities</div>
        <div className="forms">Forms</div>
        <div className="moves">Moves</div>
        <div className="species">Specis</div>
        <div className="types">Types</div>
        <div className="game-indices">game Indices</div>
      </div>
    </div>
  );
}

export default Info;
