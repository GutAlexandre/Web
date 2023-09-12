const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorFontBtns = document.querySelectorAll(".colors-font .option"),
    colorPicker = document.querySelector("#color-picker"),
    colorFontPicker = document.querySelector("#color-font-picker"),
    clearCanvas = document.querySelector(".clear-canvas"),
    saveImg = document.querySelector(".save-img"),
    values = document.querySelector(".values"),
    ctx = canvas.getContext("2d"),
    tempSizeElement = document.getElementById("temp-size");

// global variables with default value
let isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5,
    selectedColor = "#000",
    selectedFontColor = "#fff"; // Ajout de la couleur de police par défaut

const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
};

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const getMousePos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
};

const drawLine = (startX, startY, endX, endY) => {
    const valueSize = document.querySelector("#Size");
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    valueSize.value = distance.toFixed(2);
};

const drawRect = (startX, startY, endX, endY) => {
    const valueX = document.querySelector("#X"),
        valueY = document.querySelector("#Y");
    if (!fillColor.checked) {
        ctx.strokeRect(
            startX,
            startY,
            endX - startX,
            endY - startY
        );
        const width = Math.abs(endX - startX);
        const height = Math.abs(endY - startY);
        valueX.value = width;
        valueY.value = height;
    } else {
        ctx.fillRect(
            startX,
            startY,
            endX - startX,
            endY - startY
        );
        const width = Math.abs(endX - startX);
        const height = Math.abs(endY - startY);
        valueX.value = width;
        valueY.value = height;
    }
};

const drawCircle = (startX, startY, endX, endY) => {
    const valueRadius = document.querySelector("#Radius"),
        valueDiam = document.querySelector("#Diam");
    ctx.beginPath();
    const radius = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    if (!fillColor.checked) {
        ctx.stroke();
    } else {
        ctx.fill();
    }
    valueRadius.value = radius.toFixed(2);
    valueDiam.value = (radius * 2).toFixed(2);
};

const drawTriangle = (startX, startY, endX, endY) => {
    const valuecat = document.querySelector("#cathètes"),
        valuehyp = document.querySelector("#hypoténuse");
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(startX * 2 - endX, endY);
    ctx.closePath();
    if (!fillColor.checked) {
        ctx.stroke();
    } else {
        ctx.fill();
    }
    const cathete = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const hypotenuse = Math.abs(endX - startX) * 2;
    valuecat.value = cathete.toFixed(2);
    valuehyp.value = hypotenuse.toFixed(2);
};

const drawing = (e) => {
    if (!isDrawing) return;

    const mousePos = getMousePos(canvas, e);

    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.putImageData(snapshot, 0, 0);
        ctx.strokeStyle = selectedTool === "eraser" ? selectedFontColor : selectedFontColor;
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
    } else if (selectedTool === "rectangle") {
        ctx.putImageData(snapshot, 0, 0);
        drawRect(startX, startY, mousePos.x, mousePos.y);
    } else if (selectedTool === "circle") {
        ctx.putImageData(snapshot, 0, 0);
        drawCircle(startX, startY, mousePos.x, mousePos.y);
    } else if (selectedTool === "triangle") {
        ctx.putImageData(snapshot, 0, 0);
        drawTriangle(startX, startY, mousePos.x, mousePos.y);
    } else if (selectedTool === "line") {
        ctx.putImageData(snapshot, 0, 0);
        drawLine(startX, startY, mousePos.x, mousePos.y);
    }
};

let snapshot, startX, startY;

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const mousePos = getMousePos(canvas, e);
    startX = mousePos.x;
    startY = mousePos.y;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousemove", drawing);

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

toolBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        if (selectedTool === "brush" || selectedTool === "eraser") {
            values.innerHTML = "";
        } else if (selectedTool === "rectangle") {
            values.innerHTML = `<div class="input-container">
                        <label for="input1">Size X:</label>
                        <input type="text" id="X" name="input1">
                    </div>
                    <div class="input-container">
                        <label for="input2">Size Y:</label>
                        <input type="text" id="Y" name="input2">
                    </div>`;
        } else if (selectedTool === "circle") {
            values.innerHTML = `<div class="input-container">
                        <label for="input3">Radius:</label>
                        <input type="text" id="Radius" name="input3">
                    </div>
                    <div class="input-container">
                        <label for="input3">Diam. :</label>
                        <input type="text" id="Diam" name="input3">
                    </div>`;
        } else if (selectedTool === "triangle") {
            values.innerHTML = `<div class="input-container">
                        <label for="input3">cathètes:</label>
                        <input type="text" id="cathètes" name="input3">
                    </div>
                    <div class="input-container">
                        <label for="input3">hyp. :</label>
                        <input type="text" id="hypoténuse" name="input3">
                    </div>`;
        } else if (selectedTool === "line") {
            values.innerHTML = `<div class="input-container">
                        <label for="input3">Size:</label>
                        <input type="text" id="Size" name="input3">
                    </div>`;
        }
    });
});

sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value));

colorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".row.colors .options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorFontBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".row.colors-font .options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedFontColor = window.getComputedStyle(btn).getPropertyValue("background-color");
        ctx.fillStyle = selectedFontColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

colorFontPicker.addEventListener("change", () => {
    colorFontPicker.parentElement.style.background = colorFontPicker.value;
    colorFontPicker.parentElement.click();
    ctx.fillStyle = colorFontPicker.value; // Correction ici pour utiliser la valeur sélectionnée
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
});
