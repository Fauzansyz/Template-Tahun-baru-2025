let nilai;
const Toast = Swal.mixin({
  padding: "10px",
  title: 'Hitung Mundur Tahun Baru!',
  html: '<strong id="countdown" class="countdown">00:00:00</strong>',
  allowOutsideClick: false,
  buttonsStyling: true,
  confirmButtonText: 'Mau',
  showConfirmButton: true,
  confirmButton: 'btn btn-primary',
  didOpen: () => {
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = newYear - now;
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const timeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      countdownElement.innerHTML = timeFormatted;
    }, 1000);
  }
})

const card1 = Swal.mixin({
  padding: "10px",
  confirmButton: 'btn btn-primary',
  cancelButton: '#FF0040',
  buttonsStyling: true,
  confirmButtonText: 'Mau',
  allowOutsideClick: false,
  cancelButtonText: 'Enggak',
  showConfirmButton: true,
  showCancelButton: true,
  reverseButtons: true,
  imageWidth: 90,
  imageHeight: 90,
});

const basic = Swal.mixin({
  padding: "10px",
  confirmButton: 'btn btn-primary',
  showConfirmButton: true,
  confirmButtonText: 'Maksih ya',
  buttonsStyling: true,
  imageWidth: 90,
  imageHeight: 90,
});

const card = Swal.mixin({
  padding: "10px",
  confirmButton: 'btn btn-primary',
  cancelButton: '#FF0040',
  buttonsStyling: true,
  confirmButtonText: 'Kirim',
  allowOutsideClick: false,
  showConfirmButton: true,
});

const endCard = Swal.mixin({
  padding: "10px",
  confirmButton: 'btn btn-primary',
  cancelButton: '#FF0040',
  buttonsStyling: true,
  confirmButtonText: 'Kirim ke temen kalian',
  allowOutsideClick: false,
  showConfirmButton: true,
});

function maakasihDanShare() {
  endCard.fire({
    title: "Iya sama sama",
    html: '<div id="typewriter"></div>',
    showConfirmButton: true,
    didOpen: () => {
      const typewriterElement = document.getElementById("typewriter");
      const kataKata = "Semoga harapan yang sudah kamu sebutkan tadi menjadi kenyataan "
      typewriterEffect(typewriterElement, kataKata, 50);
    }
  }).then((result) => {
    if (result.isConfirmed) {
      if (navigator.share) {
        navigator.share({
            title: 'Buka dan tuliskan harapan kalian di tahun 2025 yang akan datang',
            url: "http://localhost:7700"
          })
          .then(() => console.log('Berhasil dibagikan'))
          .catch((error) => console.error('Gagal membagikan', error));
      } else {

      }
    }
  })
}

function showHarapanAi() {
  fetch(`https://endpoint-fawn.vercel.app/api/completion/llama3-8b/barikan saya doa untuk harapan tahun 2025 sesingkatnya dan jawab sesuai agama islam`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    }).then((data) => {
      basic.fire({
        title: 'Selamat Tahun Baru!',
        html: '<div id="typewriter"></div>',
        showConfirmButton: true,
        didOpen: () => {
          const typewriterElement = document.getElementById('typewriter');

          typewriterEffect(typewriterElement, data.reply, 50);
        }
      }).then((result) => {
        if (result.isConfirmed) {
          maakasihDanShare()
        }
      })
    })
}

function showPromptAndSelamat2() {
  card.fire({
      title: "Tulis harapanmu untuk tahun 2025",
      html: '<textarea cols="30" rows="10" id="messageUser"></textarea>',
      preConfirm: () => {
        const message = document.getElementById("messageUser").value.trim();
        if (!message) {
          showPromptAndSelamat()
          return false;
        }
        return message;
      }
    })
    .then((result) => {
      if (result.value) {
        const message = result.value;

        fetch(`https://endpoint-fawn.vercel.app/api/completion/llama3-8b/${message} jawab sesingkatnya`)
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
          .then((data) => {
            basic.fire({
              title: "Selamat Tahun Baru!",
              html: '<div id="typewriter"></div>',
              showConfirmButton: false,
              didOpen: () => {
                const typewriterElement = document.getElementById("typewriter");
                typewriterEffect(typewriterElement, data.reply, 50);
              }
            }).then((result) => {
              if (result.isConfirmed) {
                maakasihDanShare()
              }
            })
          });
      }
    });
}

function showPromptAndSelamat() {
  card.fire({
      title: "Tulis harapanmu untuk tahun 2025",
      html: '<textarea cols="30" rows="10" id="messageUser"></textarea>',
      preConfirm: () => {
        const message = document.getElementById("messageUser").value.trim();
        if (!message) {
          // basic.showValidationMessage("Harapan tidak boleh kosong!");
          showPromptAndSelamat2()
          return false;
        }
        return message;
      }
    })
    .then((result) => {
      if (result.value) {
        const message = result.value;

        fetch(`https://endpoint-fawn.vercel.app/api/completion/llama3-8b/${message} jawab sesingkatnya`)
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
          .then((data) => {
            basic.fire({
              title: "Selamat Tahun Baru!",
              html: '<div id="typewriter"></div>',
              showConfirmButton: true,
              didOpen: () => {
                const typewriterElement = document.getElementById("typewriter");
                typewriterEffect(typewriterElement, data.reply, 50);
              }
            }).then((result) => {
              if (result.isConfirmed) {
                maakasihDanShare()
              }
            })
          })
      }
    });
}

function showNewYearDialog() {
  card1
    .fire({
      title: "Selamat tahun baru",
      text: "Mau nulis harapan buat tahun baru gak nih?",
      imageUrl: "/20241224_201816.png",
      showCancelButton: true,
      confirmButtonText: "Mau",
      cancelButtonText: "Enggak",
    })
    .then((result) => {
      if (result.isConfirmed) {
        showPromptAndSelamat();
      } else {
        showHarapanAi();
      }
    });
}

function pesan() {
  const newYear = new Date('January 1, 2025 00:00:00').getTime();

  Toast.fire({
    title: 'Hitung Mundur Tahun Baru!',
    html: '<p>Duh bentar lagi tahun baru nihh</p><br/> <strong id="countdown" class="countdown">00:00:00</strong>',
    didOpen: () => {
      const countdownElement = document.getElementById('countdown');
      if (countdownElement) {
        const interval = setInterval(() => {
          const now = new Date().getTime();
          const distance = newYear - now;

          if (distance <= 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "00:00:00";
            return;
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          countdownElement.innerHTML = `${days}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        }, 1000);
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Memulai dialog
      showNewYearDialog();
      const audio = new Audio("/almostday.mp3")
      audio.play()
    }
  })
}


function typewriterEffect(element, text, speed = 100) {
  let index = 0;
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(index);
    index++;
    if (index === text.length) {
      clearInterval(interval);
    }
  }, speed);
}

// Tombol untuk memunculkan SweetAlert
pesan();