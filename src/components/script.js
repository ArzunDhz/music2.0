

function a ()
{
const c = document.querySelector("canvas");
let opt = {
    width: c.offsetWidth,
    height: c.offsetHeight,
    midY: c.offsetHeight / 2,
    point: 80,
    strech: 10,
    speed: -0.1,
    sinHeight: 0,
    strokeColor: " black",
    strokeWidth: 1.5,
    power: false,
  };
  
  c.width = opt.width * 2;
  c.height = opt.height * 2;
  c.style.width = opt.width;
  c.style.height = opt.height;
  
  const ctx = c.getContext("2d");
  ctx.scale(2, 2);
  ctx.strokeStyle = opt.strokeColor;
  ctx.lineWidth = opt.strokeWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  
  let time = 0;
  const render = () => {
    window.requestAnimationFrame(render);
    ctx.clearRect(0, 0, opt.width, opt.height);
    time += 1;
    ctx.beginPath();
    let increment = 0;
    for (i = 0; i < opt.point; i++) {
      if (i < opt.point / 2) {
        increment += 0.1;
      } else {
        increment += -0.1;
      }
  
      const x = (opt.width / opt.point) * i;
      const y =
        opt.midY +
        Math.sin(time * opt.speed + i / opt.strech) *
          opt.sinHeight *
          increment;
      ctx.lineTo(x, y);
    }
  
    ctx.stroke();
  };
  
  render();
  const clicked = () => {
    alert('clicked');
    opt.power = !opt.power;
    if (opt.power) {
      TweenMax.to(opt, 1, {
        sinHeight: 4,
        strech: 5,
        ease: Power2.easeInOut,
      });
    } else {
      TweenMax.to(opt, 1, {
        sinHeight: 0,
        strech: 10,
        ease: Power3.easeInOut,
      });
    }
  };
  document.querySelector("canvas").addEventListener("click", clicked);

}

