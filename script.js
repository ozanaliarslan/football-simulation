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
  
  // Grup listesi
  let gruplar = {};
  
  // Grup puan durumu
  let grupPuanDurumlari = {};
  
  // Eleme turları
  let elemeTurlari = [];
  
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
        let hedefTakimSayisi = parseInt(takimSayisiInput);
  
        // Takım sayısını kontrol et
        if (isNaN(hedefTakimSayisi) || hedefTakimSayisi < 16 || hedefTakimSayisi % 16 !== 0) {
          alert('Lütfen 16\'nın katı ve en az 16 olan bir takım sayısı giriniz.');
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
    let hedefTakimSayisi = parseInt(takimSayisiInput);
  
    // Takım sayısını kontrol et
    if (isNaN(hedefTakimSayisi) || hedefTakimSayisi < 16 || hedefTakimSayisi % 16 !== 0) {
      alert('Lütfen 16\'nın katı ve en az 16 olan bir takım sayısı giriniz.');
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
    let hedefTakimSayisi = parseInt(takimSayisiInput);
  
    // Takım sayısını kontrol et
    if (isNaN(hedefTakimSayisi) || hedefTakimSayisi < 16 || hedefTakimSayisi % 16 !== 0) {
      alert('Lütfen 16\'nın katı ve en az 16 olan bir takım sayısı giriniz.');
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
  
  // Turnuvayı başlatma
  function turnuvayiBaslat() {
    // Hedef takım sayısını al
    let takimSayisiInput = document.getElementById('takimSayisi').value;
    let hedefTakimSayisi = parseInt(takimSayisiInput);
  
    // Kontroller
    if (isNaN(hedefTakimSayisi) || hedefTakimSayisi < 16 || hedefTakimSayisi % 16 !== 0) {
      alert('Lütfen 16\'nın katı ve en az 16 olan bir takım sayısı giriniz.');
      return;
    }
  
    if (secilenTakimlar.length !== hedefTakimSayisi) {
      alert(`Seçilen takım sayısı ${hedefTakimSayisi} olmalıdır.`);
      return;
    }
  
    // Grup sayısını hesapla
    let grupSayisi = hedefTakimSayisi / 4;
  
    // Takımları karıştır ve gruplara böl
    let karisikTakimlar = secilenTakimlar.sort(() => 0.5 - Math.random());
  
    for (let i = 0; i < grupSayisi; i++) {
      let grupAdi = 'Grup ' + String.fromCharCode(65 + i);
      gruplar[grupAdi] = karisikTakimlar.slice(i * 4, (i + 1) * 4);
    }
  
    // Grup maçlarını ve puan durumlarını hazırlayalım
    for (let grup in gruplar) {
      grupPuanDurumlari[grup] = {};
      gruplar[grup].forEach(takim => {
        grupPuanDurumlari[grup][takim] = {
          oynananMac: 0,
          galibiyet: 0,
          beraberlik: 0,
          maglubiyet: 0,
          atilanGol: 0,
          yenilenGol: 0,
          averaj: 0,
          puan: 0
        };
      });
    }
  
    alert('Turnuva başlıyor!');
  
    // Ayarları gizle, turnuva bölümünü göster
    document.getElementById('turnuvaAyarları').style.display = 'none';
    document.getElementById('turnuvaBolumu').style.display = 'block';
  
    // Grupları göster
    gruplariGoster();
  }
  
  // Grupları gösterme
  function gruplariGoster() {
    const grupListesiDiv = document.getElementById('grupListesi');
    grupListesiDiv.innerHTML = ''; // Önce temizle
  
    for (let grup in gruplar) {
      let grupDiv = document.createElement('div');
      grupDiv.className = 'grup';
  
      let grupBaslik = document.createElement('h3');
      grupBaslik.textContent = grup;
      grupDiv.appendChild(grupBaslik);
  
      // Puan durumu tablosu
      let tablo = document.createElement('table');
      tablo.border = '1';
  
      let baslik = tablo.insertRow();
      let basliklar = ['Takım', 'O', 'G', 'B', 'M', 'A', 'Y', 'AV', 'P'];
      basliklar.forEach(function(baslikAdi) {
        let th = document.createElement('th');
        th.textContent = baslikAdi;
        baslik.appendChild(th);
      });
  
      // İlk etapta tüm değerler sıfır olacak
      gruplar[grup].forEach(function(takim) {
        let satir = tablo.insertRow();
        satir.insertCell().textContent = takim;
        for (let i = 0; i < 8; i++) {
          satir.insertCell().textContent = '0';
        }
      });
  
      grupDiv.appendChild(tablo);
  
      // Maç fikstürü
      let fiksturDiv = document.createElement('div');
      fiksturDiv.className = 'fikstur';
  
      let fiksturBaslik = document.createElement('h4');
      fiksturBaslik.textContent = 'Fikstür';
      fiksturDiv.appendChild(fiksturBaslik);
  
      let fiksturTablo = document.createElement('table');
      fiksturTablo.border = '1';
      fiksturTablo.className = 'fikstur-tablosu';
  
      let fiksturBaslikSatir = fiksturTablo.insertRow();
      ['Ev Sahibi', 'Skor', 'Deplasman', ''].forEach(function(baslikAdi) {
        let th = document.createElement('th');
        th.textContent = baslikAdi;
        fiksturBaslikSatir.appendChild(th);
      });
  
      // Maçları oluştur
      let maclar = grupFiksturOlustur(gruplar[grup]);
      // Maçları sakla
      gruplar[grup + '_maclar'] = maclar;
  
      // Maçları tabloya ekle
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
        if (!mac.oynandi) {
          let button = document.createElement('button');
          button.textContent = 'Maçı Oyna';
          button.onclick = function() {
            grupMaciOynat(grup, index);
          };
          butonHucre.appendChild(button);
        } else {
          butonHucre.textContent = '';
        }
      });
  
      fiksturDiv.appendChild(fiksturTablo);
  
      // Grup maçlarını toplu oynama butonu
      let grupMaclariOynaButonu = document.createElement('button');
      grupMaclariOynaButonu.textContent = 'Grup Maçlarını Oyna';
      grupMaclariOynaButonu.onclick = function() {
        grupMaclariniOynat(grup);
      };
      fiksturDiv.appendChild(grupMaclariOynaButonu);
  
      grupDiv.appendChild(fiksturDiv);
  
      grupListesiDiv.appendChild(grupDiv);
    }
  }
  
  // Grup fikstürü oluşturma
  function grupFiksturOlustur(takimlar) {
    let maclar = [];
    for (let i = 0; i < takimlar.length; i++) {
      for (let j = i + 1; j < takimlar.length; j++) {
        // Ev sahibi - Deplasman
        maclar.push({ evTakim: takimlar[i], misafirTakim: takimlar[j], oynandi: false });
        // Deplasman - Ev sahibi
        maclar.push({ evTakim: takimlar[j], misafirTakim: takimlar[i], oynandi: false });
      }
    }
    return maclar;
  }
  
  // Grup maçı oynatma
  function grupMaciOynat(grup, macIndex) {
    let maclar = gruplar[grup + '_maclar'];
  
    let mac = maclar[macIndex];
  
    // Maçı simüle et
    let macSonucu = maclariSimuleEt([mac])[0];
  
    // Puan tablosunu güncelle
    grupPuanDurumlariGuncelle(grup, [macSonucu]);
  
    // Maçı oynanmış olarak işaretle ve sonuçları ekle
    mac.evGol = macSonucu.evGol;
    mac.misafirGol = macSonucu.misafirGol;
    mac.oynandi = true;
  
    // Grupları güncelle
    gruplariGoster();
  
    // Eğer tüm maçlar oynandıysa eleme aşamasını başlat
    if (tümGrupMaclariOynandiMi()) {
      elemeAsamasiniBaslat();
    }
  }
  
  // Grup maçlarını oynatma
  function grupMaclariniOynat(grup) {
    let maclar = gruplar[grup + '_maclar'];
  
    // Oynanmamış maçları filtrele
    let oynanmamisMaclar = maclar.filter(m => !m.oynandi);
  
    if (oynanmamisMaclar.length === 0) {
      alert('Bu grubun tüm maçları zaten oynandı.');
      return;
    }
  
    // Maçları simüle et
    let macSonuclari = maclariSimuleEt(oynanmamisMaclar);
  
    // Puan tablosunu güncelle
    grupPuanDurumlariGuncelle(grup, macSonuclari);
  
    // Maçları oynanmış olarak işaretle ve sonuçları ekle
    oynanmamisMaclar.forEach((mac, index) => {
      mac.evGol = macSonuclari[index].evGol;
      mac.misafirGol = macSonuclari[index].misafirGol;
      mac.oynandi = true;
    });
  
    // Grupları güncelle
    gruplariGoster();
  
    // Eğer tüm maçlar oynandıysa eleme aşamasını başlat
    if (tümGrupMaclariOynandiMi()) {
      elemeAsamasiniBaslat();
    }
  }
  
  // Tüm grup maçlarının oynanıp oynanmadığını kontrol etme
  function tümGrupMaclariOynandiMi() {
    for (let grup in gruplar) {
      if (Array.isArray(gruplar[grup + '_maclar'])) {
        let maclar = gruplar[grup + '_maclar'];
        if (maclar.some(m => !m.oynandi)) {
          return false;
        }
      }
    }
    return true;
  }
  
  // Grup puan durumunu güncelleme
  function grupPuanDurumlariGuncelle(grup, macSonuclari) {
    let puanTablosu = grupPuanDurumlari[grup];
  
    macSonuclari.forEach(function(mac) {
      let evTakim = mac.evTakim;
      let misafirTakim = mac.misafirTakim;
  
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
  
  // Eleme aşamasını başlatma
  function elemeAsamasiniBaslat() {
    // Eleme aşaması bölümünü göster
    document.getElementById('elemeAsamasi').style.display = 'block';
  
    // Gruptan çıkan takımları belirle
    let birinciler = [];
    let ikinciler = [];
  
    for (let grup in grupPuanDurumlari) {
      let puanTablosuArray = [];
  
      // Puan tablosunu bir diziye dönüştürüp sıralayalım
      for (let takim in grupPuanDurumlari[grup]) {
        let veri = grupPuanDurumlari[grup][takim];
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
  
      birinciler.push(puanTablosuArray[0].takimAdi);
      ikinciler.push(puanTablosuArray[1].takimAdi);
    }
  
    // Birincileri ve ikincileri eşleştir
    elemeTurlari.push({ turAdi: 'Son ' + (birinciler.length + ikinciler.length), maclar: [] });
  
    // Takımları karıştır
    ikinciler = ikinciler.sort(() => 0.5 - Math.random());
  
    birinciler.forEach(function(birinciTakim, index) {
      let ikinciTakim = ikinciler[index];
  
      // Aynı gruptan takımların eşleşmesini engelle
      while (aynıGrupKontrol(birinciTakim, ikinciTakim)) {
        ikinciler.push(ikinciler.shift());
        ikinciTakim = ikinciler[index];
      }
  
      elemeTurlari[0].maclar.push({
        evTakim: birinciTakim,
        misafirTakim: ikinciTakim,
        evGol: null,
        misafirGol: null,
        oynandi: false
      });
    });
  
    // Eleme turlarını göster
    elemeTurlariniGoster();
  }
  
  // Aynı gruptan takımların eşleşmesini kontrol etme
  function aynıGrupKontrol(takim1, takim2) {
    for (let grup in gruplar) {
      if (gruplar[grup].includes(takim1) && gruplar[grup].includes(takim2)) {
        return true;
      }
    }
    return false;
  }
  
  // Eleme turlarını gösterme
  function elemeTurlariniGoster() {
    const elemeTurlariDiv = document.getElementById('elemeTurlari');
    elemeTurlariDiv.innerHTML = ''; // Önce temizle
  
    elemeTurlari.forEach(function(tur, turIndex) {
      let turDiv = document.createElement('div');
      turDiv.className = 'eleme-turu';
  
      let turBaslik = document.createElement('h3');
      turBaslik.textContent = tur.turAdi;
      turDiv.appendChild(turBaslik);
  
      let tablo = document.createElement('table');
      tablo.border = '1';
  
      let baslik = tablo.insertRow();
      ['Ev Sahibi', 'Skor', 'Deplasman', 'Maçı Oyna'].forEach(function(baslikAdi) {
        let th = document.createElement('th');
        th.textContent = baslikAdi;
        baslik.appendChild(th);
      });
  
      tur.maclar.forEach(function(mac, macIndex) {
        let satir = tablo.insertRow();
        satir.insertCell().textContent = mac.evTakim;
  
        let skorHucre = satir.insertCell();
        if (mac.oynandi) {
          skorHucre.textContent = mac.evGol + ' - ' + mac.misafirGol;
        } else {
          skorHucre.textContent = '-';
        }
  
        satir.insertCell().textContent = mac.misafirTakim;
  
        let butonHucre = satir.insertCell();
        if (!mac.oynandi) {
          let button = document.createElement('button');
          button.textContent = 'Maçı Oyna';
          button.onclick = function() {
            elemeMaciOynat(turIndex, macIndex);
          };
          butonHucre.appendChild(button);
        } else {
          butonHucre.textContent = '';
        }
      });
  
      // Tüm maçları oynama butonu
      let tumMaclariOynaButonu = document.createElement('button');
      tumMaclariOynaButonu.textContent = 'Tüm Maçları Oyna';
      tumMaclariOynaButonu.onclick = function() {
        tumElemeMaclariniOynat(turIndex);
      };
      turDiv.appendChild(tumMaclariOynaButonu);
  
      turDiv.appendChild(tablo);
  
      elemeTurlariDiv.appendChild(turDiv);
    });
  }
  
  // Eleme maçı oynatma
  function elemeMaciOynat(turIndex, macIndex) {
    let tur = elemeTurlari[turIndex];
    let mac = tur.maclar[macIndex];
  
    // Maçı simüle et
    let macSonucu = maclariSimuleEt([mac])[0];
  
    // Maçı oynanmış olarak işaretle ve sonuçları ekle
    mac.evGol = macSonucu.evGol;
    mac.misafirGol = macSonucu.misafirGol;
    mac.oynandi = true;
  
    // Eleme turlarını güncelle
    elemeTurlariniGoster();
  
    // Eğer tüm maçlar oynandıysa bir sonraki tura geç
    if (tur.maclar.every(m => m.oynandi)) {
      if (tur.maclar.length === 1) {
        alert('Turnuva sona erdi! Şampiyon: ' + (mac.evGol > mac.misafirGol ? mac.evTakim : mac.misafirTakim));
      } else {
        birSonrakiElemeTuru();
      }
    }
  }
  
  // Tüm eleme maçlarını oynatma
  function tumElemeMaclariniOynat(turIndex) {
    let tur = elemeTurlari[turIndex];
    let oynanmamisMaclar = tur.maclar.filter(m => !m.oynandi);
  
    if (oynanmamisMaclar.length === 0) {
      alert('Bu turdaki tüm maçlar zaten oynandı.');
      return;
    }
  
    // Maçları simüle et
    let macSonuclari = maclariSimuleEt(oynanmamisMaclar);
  
    // Maçları oynanmış olarak işaretle ve sonuçları ekle
    oynanmamisMaclar.forEach((mac, index) => {
      mac.evGol = macSonuclari[index].evGol;
      mac.misafirGol = macSonuclari[index].misafirGol;
      mac.oynandi = true;
    });
  
    // Eleme turlarını güncelle
    elemeTurlariniGoster();
  
    // Eğer tüm maçlar oynandıysa bir sonraki tura geç
    if (tur.maclar.every(m => m.oynandi)) {
      if (tur.maclar.length === 1) {
        alert('Turnuva sona erdi! Şampiyon: ' + (tur.maclar[0].evGol > tur.maclar[0].misafirGol ? tur.maclar[0].evTakim : tur.maclar[0].misafirTakim));
      } else {
        birSonrakiElemeTuru();
      }
    }
  }
  
  // Bir sonraki eleme turunu başlatma
  function birSonrakiElemeTuru() {
    let oncekiTur = elemeTurlari[elemeTurlari.length - 1];
    let kazananlar = [];
  
    oncekiTur.maclar.forEach(function(mac) {
      if (mac.evGol > mac.misafirGol) {
        kazananlar.push(mac.evTakim);
      } else if (mac.evGol < mac.misafirGol) {
        kazananlar.push(mac.misafirTakim);
      } else {
        // Beraberlik durumunda rastgele birini seçelim
        kazananlar.push(Math.random() > 0.5 ? mac.evTakim : mac.misafirTakim);
      }
    });
  
    if (kazananlar.length === 1) {
      // Final maçı oynandı, turnuva sona erdi
      return;
    }
  
    // Yeni turu oluştur
    let yeniTurAdi = 'Son ' + kazananlar.length;
    elemeTurlari.push({ turAdi: yeniTurAdi, maclar: [] });
  
    // Takımları eşleştir
    for (let i = 0; i < kazananlar.length; i += 2) {
      elemeTurlari[elemeTurlari.length - 1].maclar.push({
        evTakim: kazananlar[i],
        misafirTakim: kazananlar[i + 1],
        evGol: null,
        misafirGol: null,
        oynandi: false
      });
    }
  
    // Eleme turlarını güncelle
    elemeTurlariniGoster();
  }
  
  // Oyunu yeniden başlatma
  function oyunuYenidenBaslat() {
    // Tüm verileri sıfırla
    secilenTakimlar = [];
    gruplar = {};
    grupPuanDurumlari = {};
    elemeTurlari = [];
  
    // Ayarlar bölümünü göster, diğer bölümleri gizle
    document.getElementById('turnuvaAyarları').style.display = 'block';
    document.getElementById('turnuvaBolumu').style.display = 'none';
  
    // Formları sıfırla
    document.getElementById('takimSayisi').value = 16;
    document.getElementById('ligSecimi').value = '';
    document.getElementById('mevcutTakimlar').innerHTML = '';
    document.getElementById('takimListesi').innerHTML = '';
    document.getElementById('takimAdi').value = '';
  
    // Diğer bölümleri temizle
    document.getElementById('grupListesi').innerHTML = '';
    document.getElementById('elemeTurlari').innerHTML = '';
  }