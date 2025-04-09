const imageInput = document.getElementById('imageInput');
const extractButton = document.getElementById('extractButton');
const extractButtonText = document.getElementById('extractButtonText');
const outputTextarea = document.getElementById('textOutput');
const copyButton = document.getElementById('CopyButton');


// Digita o texto dentro do textArea
extractButton.addEventListener('click', async () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = async () => {
                try {
                    const result = await Tesseract.recognize(img);
                    const days = document.getElementById("days").value;
                    outputTextarea.value = `${result.data.text.trim()} Dias: ${days}`;
                } catch (error) {
                    console.error('Error: ', error);
                }
            };
        };
        reader.readAsDataURL(file);
    }
});

extractButtonText.addEventListener('click', async () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = async () => {
                try {
                    const result = await Tesseract.recognize(img);

                    outputTextarea.value = `${result.data.text.trim()}`
                } catch (error) {
                    console.error('Error: ', error);
                }
            };
        };
        reader.readAsDataURL(file);
    }
});

// Copia o texto
copyButton.addEventListener('click', () => {
    outputTextarea.select();
    outputTextarea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    }    
)

const alert = document.getElementById("alert");
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')
        
        alert.append(wrapper)
      }
      
      const alertTrigger = document.getElementById('CopyButton')
      if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
          appendAlert('Texto copiado com sucesso!', 'success')
        })
}


