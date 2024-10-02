// Lig ve Takım verileri
const ligler = {
  'Türkiye Süper Ligi': [
    'Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Trabzonspor', 'Başakşehir', 'Sivasspor',
    'Alanyaspor', 'Antalyaspor', 'Göztepe', 'Konyaspor', 'Gençlerbirliği', 'Kayserispor',
    'Ankaragücü', 'Gaziantep FK', 'Denizlispor', 'Kasımpaşa', 'Yeni Malatyaspor', 'Çaykur Rizespor'
  ],
  'İngiltere Premier Ligi': [
    'Manchester United', 'Liverpool', 'Chelsea', 'Arsenal', 'Manchester City',
    'Tottenham', 'Leicester City', 'Everton', 'Southampton', 'West Ham United',
    'Wolverhampton', 'Newcastle United', 'Crystal Palace', 'Leeds United', 'Aston Villa',
    'Burnley', 'Brighton', 'Sheffield United'
  ],
  'İtalya Serie A': [
    'Juventus', 'Inter', 'Milan', 'Napoli', 'Roma', 'Lazio', 'Atalanta', 'Fiorentina',
    'Sassuolo', 'Torino', 'Genoa', 'Sampdoria', 'Bologna', 'Cagliari', 'Udinese',
    'Verona', 'Parma', 'Benevento'
  ],
  'Fransa Ligue 1': [
    'Paris Saint-Germain', 'Marseille', 'Lyon', 'Lille', 'Monaco', 'Rennes',
    'Nice', 'Bordeaux', 'Saint-Étienne', 'Montpellier', 'Nantes', 'Angers',
    'Strasbourg', 'Reims', 'Metz', 'Dijon', 'Nîmes', 'Amiens'
  ],
  'Almanya Bundesliga': [
    'Bayern Münih', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Mönchengladbach',
    'Wolfsburg', 'Hoffenheim', 'Schalke 04', 'Eintracht Frankfurt', 'Hertha Berlin',
    'Werder Bremen', 'Mainz 05', 'Augsburg', 'Freiburg', 'Köln', 'Union Berlin',
    'Fortuna Düsseldorf', 'Paderborn'
  ],
  'İspanya La Liga': [
    'Real Madrid', 'Barcelona', 'Atletico Madrid', 'Sevilla', 'Valencia',
    'Villarreal', 'Real Sociedad', 'Athletic Bilbao', 'Granada', 'Getafe',
    'Real Betis', 'Levante', 'Osasuna', 'Espanyol', 'Celta Vigo', 'Alavés',
    'Eibar', 'Mallorca'
  ],
  'Hollanda Eredivisie': [
    'Ajax', 'PSV', 'Feyenoord', 'AZ Alkmaar', 'Vitesse', 'Utrecht', 'Groningen',
    'Heerenveen', 'Heracles', 'Twente', 'Zwolle', 'Sparta Rotterdam', 'Willem II',
    'VVV-Venlo', 'Emmen', 'ADO Den Haag', 'RKC Waalwijk', 'Fortuna Sittard'
  ],
  'Belçika Pro League': [
    'Club Brugge', 'Standard Liège', 'Anderlecht', 'Gent', 'Genk', 'Antwerp',
    'Charleroi', 'Zulte Waregem', 'Kortrijk', 'Mechelen', 'Oostende', 'St. Truiden',
    'Cercle Brugge', 'Waasland-Beveren', 'Eupen', 'Mouscron', 'Beveren', 'Lokeren'
  ],
  'Portekiz Primeira Liga': [
    'Porto', 'Benfica', 'Sporting Lisbon', 'Braga', 'Rio Ave', 'Vitória Guimarães',
    'Boavista', 'Marítimo', 'Moreirense', 'Santa Clara', 'Paços de Ferreira',
    'Gil Vicente', 'Famalicão', 'Belenenses', 'Tondela', 'Portimonense', 'Aves',
    'Nacional'
  ]
};

// Seçilen takımları tutacağımız dizi
let secilenTakimlar = [];

// Aktif hafta
let aktifHafta = 0;
let guncelHafta = 0;

// Puan tablosu
let puanTablosu = {};

// Fikstür
let fikstur = [];

// Hedef takım sayısı
let hedefTakimSayisi = 18;

// Sayfa yüklendiğinde lig seçeneklerini dolduralım
window.onload = function() {
  const ligSecimi = document.getElementById('ligSecimi');
  for (let lig in ligler) {
    let option = document.createElement('option');
    option.value = lig;
    option.text = lig;
    ligSecimi.add(option);
  }
};

// Lig takımlarını gösterme
function ligTakimlariniGetir() {
  const ligSecimi = document.getElementById('ligSecimi');
  const secilenLig = ligSecimi.value;

  if (secilenLig === '') {
    alert('Lütfen bir lig seçiniz.');
    return;
  }

  const mevcutTakimlarDiv = document.getElementById('mevcutTakimlar');
  mevcutTakimlarDiv.innerHTML = ''; // Önce temizle

  const takimlar = ligler[secilenLig];

  takimlar.forEach(function(takim) {
    let label = document.createElement('label');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = takim;
    checkbox.onchange = function() {
      // Hedef takım sayısını al
      let takimSayisiInput = document.getElementById('takimSayisi').value;
      hedefTakimSayisi = parseInt(takimSayisiInput);

      // Takım sayısını kontrol et
      if (isNaN(hedefTakimSayisi) || hedefTakimSayisi < 2 || hedefTakimSayisi % 2 !== 0) {
        alert('Lütfen çift sayı ve en az 2 olan bir takım sayısı giriniz.');
        this.checked = false;
        return;
      }

      if (this.checked) {
        if (secilenTakimlar.length >= hedefTakimSayisi) {
          alert(`Maksimum takım sayısına ulaştınız (${hedefTakimSayisi}).`);
          this.checked = false;
          return;
        }
        if (!secilenTakimlar.includes(this.value)) {
          secilenTakimlar.push(this.value);
        }
      } else {
        secilenTakimlar = secilenTakimlar.filter(t => t !== this.value);
      }
      takimlariGoster();
    };
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + takim));
    mevcutTakimlarDiv.appendChild(label);
  });
}

// Manuel takım ekleme
function takimEkle() {
  const takimAdi = document.getElementById('takimAdi').value.trim();

  // Hedef takım sayısını al
  let takimSayisiInput = document.getElementById('takimSayisi').value;
  hedefTakimSayisi = parseInt(takimSayisiInput);

  // Takım sayısını kontrol et
  if (isNaN(hedefTakimSayisi) || hedefTakimSayisi < 2 || hedefTakimSayisi % 2 !== 0) {
    alert('Lütfen çift sayı ve en az 2 olan bir takım sayısı giriniz.');
    return;
  }

  if (secilenTakimlar.length >= hedefTakimSayisi) {
    alert(`Maksimum takım sayısına ulaştınız (${hedefTakimSayisi}).`);
    return;
  }

  if (takimAdi !== '' && !secilenTakimlar.includes(takimAdi)) {
    secilenTakimlar.push(takimAdi);
    takimlariGoster();
    document.getElementById('takimAdi').value = '';
  } else {
    alert('Takım adı boş olamaz veya zaten eklenmiş.');
  }
}

// Otomatik takım ekleme
function otomatikTakimEkle() {
  // Hedef takım sayısını al
  let takimSayisiInput = document.getElementById('takimSayisi').value;
  hedefTakimSayisi = parseInt(takimSayisiInput);

  // Takım sayısını kontrol et
  if (isNaN(hedefTakimSayisi) || hedefTakimSayisi < 2 || hedefTakimSayisi % 2 !== 0) {
    alert('Lütfen çift sayı ve en az 2 olan bir takım sayısı giriniz.');
    return;
  }

  if (secilenTakimlar.length >= hedefTakimSayisi) {
    alert(`Zaten maksimum takım sayısına ulaştınız (${hedefTakimSayisi}).`);
    return;
  }

  // Tüm liglerden tüm takımları birleştir
  let tumTakimlar = [];
  for (let lig in ligler) {
    tumTakimlar = tumTakimlar.concat(ligler[lig]);
  }

  // Takımları karıştır
  tumTakimlar = tumTakimlar.sort(() => 0.5 - Math.random());

  // Eklenecek takımları filtrele
  let eklenecekTakimlar = tumTakimlar.filter(takim => !secilenTakimlar.includes(takim));

  if (eklenecekTakimlar.length === 0) {
    alert('Eklenecek başka takım yok.');
    return;
  }

  // İlk takımı ekle
  let yeniTakim = eklenecekTakimlar[0];
  secilenTakimlar.push(yeniTakim);

  // Takımları göster
  takimlariGoster();
}

// Seçilen takımları göster
function takimlariGoster() {
  const takimListesi = document.getElementById('takimListesi');
  takimListesi.innerHTML = ''; // Önce listeyi temizle

  secilenTakimlar.forEach(function(takim, index) {
    let li = document.createElement('li');
    li.textContent = (index + 1) + '. ' + takim;
    takimListesi.appendChild(li);
  });
}

// Fikstür oluşturma (Round Robin, iki devreli)
function fiksturOlustur(takimlar) {
  let turlar = [];
  let takimSayisi = takimlar.length;

  // Takım sayısı tekse 'Bay' ekleyerek çift sayıya tamamlıyoruz
  if (takimSayisi % 2 !== 0) {
    takimlar.push('Bay');
    takimSayisi += 1;
  }

  let turSayisi = takimSayisi - 1;
  let macSayisiHerTur = takimSayisi / 2;

  for (let tur = 0; tur < turSayisi; tur++) {
    let maclar = [];
    for (let mac = 0; mac < macSayisiHerTur; mac++) {
      let evTakim = takimlar[mac];
      let misafirTakim = takimlar[takimSayisi - 1 - mac];

      if (evTakim !== 'Bay' && misafirTakim !== 'Bay') {
        maclar.push({ evTakim, misafirTakim, oynandi: false });
      }
    }
    // Takımları döndürme
    takimlar.splice(1, 0, takimlar.pop());
    turlar.push(maclar);
  }

  // İkinci yarı için ev sahibi ve misafir takımları ters çevirerek maçları ekliyoruz
  let ikinciYari = turlar.map(tur => tur.map(mac => ({
    evTakim: mac.misafirTakim,
    misafirTakim: mac.evTakim,
    oynandi: false
  })));

  // İlk ve ikinci yarıyı birleştiriyoruz
  return turlar.concat(ikinciYari);
}

// Maçları simüle etme
function maclariSimuleEt(maclar) {
  return maclar.map(function(mac) {
    let evGol = Math.floor(Math.random() * 6); // 0 ile 5 arasında
    let misafirGol = Math.floor(Math.random() * 6);
    return {
      evTakim: mac.evTakim,
      misafirTakim: mac.misafirTakim,
      evGol: evGol,
      misafirGol: misafirGol
    };
  });
}

// Puan tablosunu güncelleme
function puanTablosuGuncelle(macSonuclari) {
  macSonuclari.forEach(function(mac) {
    let evTakim = mac.evTakim;
    let misafirTakim = mac.misafirTakim;

    // Eğer takım daha önce tabloya eklenmediyse, varsayılan değerlerle ekle
    [evTakim, misafirTakim].forEach(function(takim) {
      if (!puanTablosu[takim]) {
        puanTablosu[takim] = {
          oynananMac: 0,
          galibiyet: 0,
          beraberlik: 0,
          maglubiyet: 0,
          atilanGol: 0,
          yenilenGol: 0,
          averaj: 0,
          puan: 0
        };
      }
    });

    // Takımların istatistiklerini güncelle
    puanTablosu[evTakim].oynananMac += 1;
    puanTablosu[misafirTakim].oynananMac += 1;

    puanTablosu[evTakim].atilanGol += mac.evGol;
    puanTablosu[evTakim].yenilenGol += mac.misafirGol;

    puanTablosu[misafirTakim].atilanGol += mac.misafirGol;
    puanTablosu[misafirTakim].yenilenGol += mac.evGol;

    // Maç sonucu
    if (mac.evGol > mac.misafirGol) {
      // Ev sahibi kazandı
      puanTablosu[evTakim].galibiyet += 1;
      puanTablosu[evTakim].puan += 3;
      puanTablosu[misafirTakim].maglubiyet += 1;
    } else if (mac.evGol < mac.misafirGol) {
      // Misafir takım kazandı
      puanTablosu[misafirTakim].galibiyet += 1;
      puanTablosu[misafirTakim].puan += 3;
      puanTablosu[evTakim].maglubiyet += 1;
    } else {
      // Beraberlik
      puanTablosu[evTakim].beraberlik += 1;
      puanTablosu[evTakim].puan += 1;
      puanTablosu[misafirTakim].beraberlik += 1;
      puanTablosu[misafirTakim].puan += 1;
    }

    // Averaj güncelleme
    puanTablosu[evTakim].averaj = puanTablosu[evTakim].atilanGol - puanTablosu[evTakim].yenilenGol;
    puanTablosu[misafirTakim].averaj = puanTablosu[misafirTakim].atilanGol - puanTablosu[misafirTakim].yenilenGol;
  });
}

// Puan tablosunu gösterme
function puanTablosunuGoster() {
  let puanTablosuArray = [];

  // Puan tablosunu bir diziye dönüştürüp sıralayalım
  for (let takim in puanTablosu) {
    let veri = puanTablosu[takim];
    veri.takimAdi = takim;
    puanTablosuArray.push(veri);
  }

  // Puan, averaj, atılan gol ve takım adına göre sıralama
  puanTablosuArray.sort(function(a, b) {
    if (b.puan !== a.puan) {
      return b.puan - a.puan;
    } else if (b.averaj !== a.averaj) {
      return b.averaj - a.averaj;
    } else if (b.atilanGol !== a.atilanGol) {
      return b.atilanGol - a.atilanGol;
    } else {
      return a.takimAdi.localeCompare(b.takimAdi);
    }
  });

  // Tabloyu ekranda göster
  const tabloDiv = document.getElementById('puanTablosu');
  tabloDiv.innerHTML = ''; // Önce temizle

  let tablo = document.createElement('table');
  tablo.border = '1';

  // Tablo başlıkları
  let baslik = tablo.insertRow();
  let basliklar = ['Sıra', 'Takım', 'O', 'G', 'B', 'M', 'A', 'Y', 'AV', 'P'];
  basliklar.forEach(function(baslikAdi) {
    let th = document.createElement('th');
    th.textContent = baslikAdi;
    baslik.appendChild(th);
  });

  // Takım verileri
  puanTablosuArray.forEach(function(takimVeri, index) {
    let satir = tablo.insertRow();
    satir.insertCell().textContent = index + 1; // Sıra
    satir.insertCell().textContent = takimVeri.takimAdi;
    satir.insertCell().textContent = takimVeri.oynananMac;
    satir.insertCell().textContent = takimVeri.galibiyet;
    satir.insertCell().textContent = takimVeri.beraberlik;
    satir.insertCell().textContent = takimVeri.maglubiyet;
    satir.insertCell().textContent = takimVeri.atilanGol;
    satir.insertCell().textContent = takimVeri.yenilenGol;
    satir.insertCell().textContent = takimVeri.averaj;
    satir.insertCell().textContent = takimVeri.puan;
  });

  tabloDiv.appendChild(tablo);
}

// Fikstürü ve maçları göster
function fiksturGoster() {
  const haftaNumarasi = document.getElementById('haftaNumarasi');
  const fiksturTablo = document.getElementById('fiksturTablo');

  haftaNumarasi.textContent = (aktifHafta + 1) + '. Hafta';
  fiksturTablo.innerHTML = ''; // Önce temizle

  // Tablo başlıkları
  let baslik = fiksturTablo.insertRow();
  let basliklar = ['Ev Sahibi', 'Skor', 'Deplasman', ''];
  basliklar.forEach(function(baslikAdi) {
    let th = document.createElement('th');
    th.textContent = baslikAdi;
    baslik.appendChild(th);
  });

  let maclar = fikstur[aktifHafta];

  maclar.forEach(function(mac, index) {
    let satir = fiksturTablo.insertRow();
    satir.insertCell().textContent = mac.evTakim;

    let skorHucre = satir.insertCell();
    if (mac.oynandi) {
      skorHucre.textContent = mac.evGol + ' - ' + mac.misafirGol;
    } else {
      skorHucre.textContent = '-';
    }

    satir.insertCell().textContent = mac.misafirTakim;

    let butonHucre = satir.insertCell();
    if (!mac.oynandi && aktifHafta === guncelHafta) {
      // "Maçı Oyna" butonu
      let button = document.createElement('button');
      button.textContent = 'Maçı Oyna';
      button.onclick = function() {
        maciOynat(index);
      };
      butonHucre.appendChild(button);
    } else {
      butonHucre.textContent = '';
    }
  });
}

// Tek bir maçı oynatma
function maciOynat(macIndex) {
  let maclar = fikstur[aktifHafta];

  // Önceki haftaların maçları oynanmış mı kontrolü
  for (let i = 0; i < aktifHafta; i++) {
    if (fikstur[i].some(m => !m.oynandi)) {
      alert('Önceki haftaların tüm maçlarını oynamadan bu haftanın maçlarını oynayamazsınız.');
      return;
    }
  }

  // Seçilen maçı simüle et
  let macSonucu = maclariSimuleEt([maclar[macIndex]])[0];

  // Puan tablosunu güncelle
  puanTablosuGuncelle([macSonucu]);

  // Maçı oynanmış olarak işaretle ve sonuçları ekle
  maclar[macIndex].oynandi = true;
  maclar[macIndex].evGol = macSonucu.evGol;
  maclar[macIndex].misafirGol = macSonucu.misafirGol;

  // Fikstürü güncelle
  fiksturGoster();

  // Puan tablosunu güncelle
  puanTablosunuGoster();

  // Eğer haftanın tüm maçları oynandıysa guncelHafta'yı artır
  if (maclar.every(m => m.oynandi)) {
    guncelHafta++;
  }
}

// Tüm maçları oynatma
function tumMaclariOynat() {
  let maclar = fikstur[aktifHafta];

  // Önceki haftaların maçları oynanmış mı kontrolü
  for (let i = 0; i < aktifHafta; i++) {
    if (fikstur[i].some(m => !m.oynandi)) {
      alert('Önceki haftaların tüm maçlarını oynamadan bu haftanın maçlarını oynayamazsınız.');
      return;
    }
  }

  // Oynanmamış maçları filtrele
  let oynanmamisMaclar = maclar.filter(m => !m.oynandi);

  if (oynanmamisMaclar.length === 0) {
    alert('Bu haftanın maçları zaten oynandı.');
    return;
  }

  // Maçları simüle et
  let macSonuclari = maclariSimuleEt(oynanmamisMaclar);

  // Puan tablosunu güncelle
  puanTablosuGuncelle(macSonuclari);

  // Maçları oynanmış olarak işaretle ve sonuçları ekle
  oynanmamisMaclar.forEach((mac, index) => {
    mac.oynandi = true;
    mac.evGol = macSonuclari[index].evGol;
    mac.misafirGol = macSonuclari[index].misafirGol;
  });

  // Fikstürü güncelle
  fiksturGoster();

  // Puan tablosunu güncelle
  puanTablosunuGoster();

  // Haftanın tüm maçları oynandı, guncelHafta'yı artır
  if (maclar.every(m => m.oynandi)) {
    guncelHafta++;
  }
}

// Sonraki haftaya geç
function sonrakiHafta() {
  if (aktifHafta < fikstur.length - 1) {
    aktifHafta++;
    fiksturGoster();
  } else {
    alert('Son haftadasınız.');
  }
}

// Önceki haftaya geç
function oncekiHafta() {
  if (aktifHafta > 0) {
    aktifHafta--;
    fiksturGoster();
  } else {
    alert('İlk haftadasınız.');
  }
}

// Oyunu başlatma
function oyunuBaslat() {
  // Hedef takım sayısını al
  let takimSayisiInput = document.getElementById('takimSayisi').value;
  hedefTakimSayisi = parseInt(takimSayisiInput);

  // Takım sayısını kontrol et
  if (isNaN(hedefTakimSayisi) || hedefTakimSayisi < 2 || hedefTakimSayisi % 2 !== 0) {
    alert('Lütfen çift sayı ve en az 2 olan bir takım sayısı giriniz.');
    return;
  }

  if (secilenTakimlar.length !== hedefTakimSayisi) {
    alert(`Seçilen takım sayısı ${hedefTakimSayisi} olmalıdır.`);
    return;
  }

  // Fikstürü oluştur
  fikstur = fiksturOlustur(secilenTakimlar.slice());
  aktifHafta = 0;
  guncelHafta = 0;

  alert('Oyun başlıyor!');

  // Lig oluşturma bölümünü gizle, diğer bölümleri göster
  document.getElementById('ligOlusturma').style.display = 'none';
  document.getElementById('oyunBolumu').style.display = 'block';

  // Puan tablosunu sıfırla
  puanTablosu = {};

  // Ekranı temizle
  document.getElementById('puanTablosu').innerHTML = '';

  // Fikstürü göster
  fiksturGoster();

  // Puan tablosunu göster
  puanTablosunuGoster();
}

// Oyunu yeniden başlatma
function oyunuYenidenBaslat() {
  // Tüm verileri sıfırla
  secilenTakimlar = [];
  aktifHafta = 0;
  guncelHafta = 0;
  puanTablosu = {};
  fikstur = [];

  // Lig oluşturma bölümünü göster, oyun bölümünü gizle
  document.getElementById('ligOlusturma').style.display = 'block';
  document.getElementById('oyunBolumu').style.display = 'none';

  // Formları sıfırla
  document.getElementById('takimSayisi').value = 18;
  document.getElementById('ligSecimi').value = '';
  document.getElementById('mevcutTakimlar').innerHTML = '';
  document.getElementById('takimListesi').innerHTML = '';
  document.getElementById('takimAdi').value = '';

  // Puan tablosunu temizle
  document.getElementById('puanTablosu').innerHTML = '';
}