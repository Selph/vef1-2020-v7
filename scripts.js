/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  let input = prompt(`Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“`);
  if (input == null) {
    alert(`Það er bannað að hætta við.`);
    start();
  } else if (input != `kóða` && input != `afkóða`) {
    alert(`Veit ekki hvaða aðgerð „${input}“ er. Reyndu aftur.`);
    start();
  } else {
    const action = `${input}`;
    input = prompt(`Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]`);
    if (parseInt(input) < 1 || parseInt(input) > 31 || isNaN(input)) {
      alert(`${input} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`);
      start();
    } else if (input == '') {
      alert(`Þú gafst ekki upp heiltölu. Reyndu aftur`);
      start();
    } else {
      const n = parseInt(`${input}`);
      const kodi = prompt(`Gefðu upp strenginn sem á að ${action} með hliðrun ${n}:`).toLocaleUpperCase();
      const leyft = leyfdir(kodi);
      if (kodi == '') {
        alert(`Þú gafst ekki upp streng. Reyndu aftur`);
        start();
      } else if (leyft == false) {
        const invalid = sigtun(kodi);
        alert(`Þú gafst upp stafi sem ekki er hægt að ${action}: ${invalid.join(', ')}. Reyndu aftur.`);
        start();
      } else if (action == 'kóða') {
        let dulkodi = encode(kodi, n);
        if (confirm(`${dulkodi}`) == true) {
          start();
        }
      } else if (action == 'afkóða') {
        let afkodun = decode(kodi, n);
        if (confirm(`${afkodun}`) == true){
          start();
        }
      }
    }
  }
}

/**
 * Finnur út hvort að kóðinn sé gildur til dulkóðunar
 *
 * @param {string} x Strengur sem skal kóða
 * @returns {boolean} true ef gildur, false ef ekki
 */
function leyfdir(x) {
  const m = x.split("");
  const n = LETTERS.split("");
  const s = true;
  const z = false;
for (i = 0; i < m.length; i++) {
  for (j = 0; j < n.length; j++) {
    if (m[i] == n[j]) {
      z == true;
    }
  }
  if (z == false) {
    s == false;
  }
}
  return s;
}
/**
 * Sigtar út stafi eða bil sem má ekki dulkóða og skilar sem streng
 *
 * @param {string} x Strengur sem skal sigta
 * @returns {string} Sigtaður strengur
 */
function sigtun(x) {
 const profun = x;
 const utspyting = profun.match(/[^AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ]+/);
 return utspyting;
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();


/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(dulkoda, n) {
  let upprunalegtFylki = LETTERS.split("");
  let hlidradFylki = [];
  let dulkodadFylki = dulkoda.split("");
  for (i = 0; i < LETTERS.length; i++) {
    if (i - n < 0) {
      hlidradFylki[i+32-n] = upprunalegtFylki[i];
    } else {
      hlidradFylki[i-n] = upprunalegtFylki[i];
    }
  }
  loop1:
  for (i = 0; i < dulkodadFylki.length; i++) {
    loop2:
    for (j = 0; j < LETTERS.length; j++) {
      if (dulkodadFylki[i] == upprunalegtFylki[j]) {
        dulkodadFylki[i] = hlidradFylki[j];
        break loop2;
      }
    }
  }

  const dSkilabod = dulkodadFylki.join('');
  return dSkilabod;

}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(afkoda, n) {
  let upprunalegtFylki = LETTERS.split("");
  let hlidradFylki = [];
  let afkodadFylki = afkoda.split("");
  for (i = 0; i < LETTERS.length; i++) {
    if (i + n > 31) {
      hlidradFylki[i-32+n] = upprunalegtFylki[i];
    } else {
      hlidradFylki[i+n] = upprunalegtFylki[i];
    }
  }
  loop1:
  for (i = 0; i < afkodadFylki.length; i++) {
    loop2:
    for (j = 0; j < LETTERS.length; j++) {
      if (afkodadFylki[i] == upprunalegtFylki[j]) {
        afkodadFylki[i] = hlidradFylki[j];
        break loop2;
      }
    }
  }
  const aSkilabod = afkodadFylki.join('');
  return aSkilabod;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
