let root;
let xp = 0;

window.addEventListener('load', onLoad);

function makeElement(type, id, c, parent) {
  let ret = document.createElement(type);
  ret.id = id;
  if (c) ret.className = c;
  parent.appendChild(ret);
  return ret;
}

function animateButton(b) {
  b.addEventListener("click", () => {
    b.style.webkitAnimationName = 'squish';
    b.style.webkitAnimationDuration = '0.25s';
    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        setTimeout(() => { b.style.borderColor = "yellow"; }, 100*i);
      }
      else {
        setTimeout(() => { b.style.borderColor = "magenta"; }, 100*i);
      }
    }
    setTimeout(() => { b.style.borderColor = "black"; }, 600);
    setTimeout(() => { b.style.webkitAnimationName = ''; }, 250);
  });
}

function title_load(r) {
  r.innerHTML = '';
  document.body.style = 'background: url("title_bg.jpg") no-repeat center center fixed;  -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;';
  let center_container = makeElement("center", "center_container", null, root);
  let title_img = makeElement("img", "title_img", null, center_container);
  title_img.src = "title.png";
  let play_container = makeElement("div", "play_container", null, center_container);
  let play_btn = makeElement("button", "play_btn", null, center_container);
  play_btn.innerText = "Play";
  animateButton(play_btn);
  play_btn.addEventListener("click", () => { setTimeout(() => { menu_load(r) }, 600) });
}

function menu_load(r) {
  r.innerHTML = '';
  document.body.style = 'margin: 0px; background: url("menu_bg.png") no-repeat center center fixed;  -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;';
  let top_border = makeElement("div", "top_border", "border", r); 
  top_border.innerText = "Cat Base";
  let xp_container = makeElement("div", "xp_container", null, top_border);
  xp_container.innerText = xp;
  let xp_label = makeElement("div", "xp_label", null, top_border);
  xp_label.innerText = "XP";

  let center_container = makeElement("div", "center_container", "center_grid", r);
  let version_container = makeElement("div", "version_container", "center_grid", center_container);
  let version_lbl = makeElement("p", "version_lbl", null, version_container);
  version_lbl.innerText = "m1";
  let btn_outer_container = makeElement("div", "btn_container", "center_item", center_container);
  let btn_grid = makeElement("div", "btn_grid", "btn_grid", btn_outer_container);
  let controls_btn = makeElement("button", "controls_btn", "btn_grid_item", btn_grid);
  controls_btn.innerText = "Controls!!";
  let about_btn = makeElement("button", "about_btn", "btn_grid_item", btn_grid);
  about_btn.innerText = "About";
  let return_btn = makeElement("button", "return_btn", "btn_grid_item", btn_grid);
  return_btn.innerText = "Return";
  [controls_btn, about_btn, return_btn].forEach(b => { animateButton(b); });
  controls_btn.addEventListener("click", () => { setTimeout(() => { controls_load(r) }, 600); });
  return_btn.addEventListener("click", () => { setTimeout(() => { title_load(r); }, 600); });
  about_btn.addEventListener("click", () => { setTimeout(() => { about_load(r); }, 600); });
  let capsule_cat_container = makeElement("div", "capsule_cat_container", "center_grid_item", center_container);
  let capsule_cat_speech = makeElement("div", "capsule_cat_speech", null, capsule_cat_container);
  function random_text() {
    const texts = ["dogs are cool", "snakes and ladders", "school is cool!", "this machine has a switch in it, which is super cool i think!", "cats are awesome!", "joy to the world!", "i love robots!", "Mr Battle Cat would be proud", "i've been watching too much tv", "i love the beach!", "battle cats is a fun game!"];
    capsule_cat_text.innerText = texts[Math.floor(Math.random() * texts.length)];
  };
  capsule_cat_speech.addEventListener("click", () => { random_text() });
  let capsule_cat_text = makeElement("p", "capsule_cat_text", null, capsule_cat_speech);
  random_text();
  let capsule_cat = makeElement("img", "capsule_cat", null, capsule_cat_container);
  capsule_cat.src = "capsule_cat.png";

  let bottom_border = makeElement("div", "bottom_border", null, center_container);
  bottom_border.innerText = "Mr Battle Cat";
}

function about_load(r) {
  r.innerHTML = '';
  document.body.style = 'margin: 0px; background: url("about_bg.png") no-repeat center center fixed; background-size: 100% 100%;';
  let about_container = makeElement("div", "about_container", null, r);
  let p1 = makeElement("p", "p1", null, about_container);
  p1.innerText = "So, I had a few plastic gear servos lying around, and I wanted to put them to use somewhere. I felt skeptical using them on an overly complex project, because if they failed me, I’d be sad. Thus, Mr. Battle Cat was born! Inspired by a YouTube video I saw (https://youtu.be/PX7o7X6vCUc?list=LL), and my love for the mobile game Battle Cats. Here’s the 3D model of the chassis, designed on Fusion360: ";

  let battle_cat_model = makeElement("img", "battle_cat_model", "about_img", about_container);
  battle_cat_model.src = "battle_cat_gif.gif";

  let p2 = makeElement("p", "p2", null, about_container);
  p2.innerText = "Locomotion is reliant on the four servos positioned on the bottom of the machine. For forward, backward, and turning, the servos are paired in diagonal pairings, labelled based off front facing orientation: ";

  let servo_labelling = makeElement("img", "servo_labelling", "about_img", about_container);
  servo_labelling.src = "servo_labelling.png";

  let p3 = makeElement("p", "p3", null, about_container);
  p3.innerText = "Propulsion for the locomotion works off the principle of two phases, an orientation phase and a thrust phase. Orientation phase orients the servo into a position off the ground. Thrust moves the servo back towards the ground, in a manner such that it pushes the machine forward in the desired direction.";

  let servo_mechanics = makeElement("img", "servo_mechanics", "about_img", about_container);
  servo_mechanics.src = "servo_mechanics.png";

  let p4 = makeElement("p", "p4", null, about_container);
  p4.innerText = "The following is a diagram to illustrate what direction a negative and a positive displacement from the servo’s neutral position (in most cases 90º, but for servo 1 it is 100º since it was being wacky!):";

  let servo_logic = makeElement("img", "servo_logic", "r_about_img", about_container);
  servo_logic.src = "servo_logic.png";

  let p5 = makeElement("p", "p5", null, about_container);
  p5.innerText = "The algorithm for turning left follows a three-beat gait. The first beat is the orientation phase, extending all the legs outward. The following beat sets the right-diagonal back into neutral position, therefore thrusting the machine into the opposite direction. The final beat sets the left-diagonal back into neutral position. Since the right-diagonal has already been set to neutral, the final beat will not lead to a thrust, due to the second beat moving the legs of said diagonal away from the ground.";
  let left_algorithm = makeElement("img", "left_algorithm", "r_about_img", about_container);
  left_algorithm.src = "left_algorithm.png";
  makeElement("br", "spacing", null, about_container);
  let left_bottom_view = makeElement("img", "left_bottom_view", "gif_about_img", about_container);
  left_bottom_view.src = "left_bottom_view.gif";
  makeElement("br", "spacing", null, about_container);
  let left_top_view = makeElement("img", "left_top_view", "gif_about_img", about_container);
  left_top_view.src = "left_top_view.gif";
  
  let p6 = makeElement("p", "p6", null, about_container);
  p6.innerText = "The algorithm for turning right is simply the reverse!";
  let right_algorithm = makeElement("img", "right_algorithm", "r_about_img", about_container);
  right_algorithm.src = "right_algorithm.png";
  makeElement("br", "spacing", null, about_container);
  let right_bottom_view = makeElement("img", "right_bottom_view", "gif_about_img", about_container);
  right_bottom_view.src = "right_bottom_view.gif";
  makeElement("br", "spacing", null, about_container);
  let right_top_view = makeElement("img", "right_top_view", "gif_about_img", about_container);
  right_top_view.src = "right_top_view.gif";

  let p7 = makeElement("p", "p7", null, about_container);
  p7.innerText = "The algorithm for the forward trot movement is a bit more complex. It utilizes a four-beat gait, which serve the goal to have each diagonal ultimately thrust the machine forward. Beats 1 and 3 are the orientation phases, while beats 2 and 4 are the thrust phases. Magic!";
  let forward_algorithm = makeElement("img", "forward_algorithm", "r_about_img", about_container);
  forward_algorithm.src = "forward_algorithm.png";
  makeElement("br", "spacing", null, about_container);
  let forward_bottom_view = makeElement("img", "forward_bottom_view", "gif_about_img", about_container);
  forward_bottom_view.src = "forward_bottom_view.gif";
  makeElement("br", "spacing", null, about_container);
  let forward_top_view = makeElement("img", "forward_top_view", "gif_about_img", about_container);
  forward_top_view.src = "forward_top_view.gif";

  let p8 = makeElement("p", "p8", null, about_container);
  p8.innerText = "Reversing the algorithm gets us a backwards trot!";
  let backward_algorithm = makeElement("img", "backward_algorithm", "r_about_img", about_container);
  backward_algorithm.src = "backward_algorithm.png";
  makeElement("br", "spacing", null, about_container);
  let backward_bottom_view = makeElement("img", "backward_bottom_view", "gif_about_img", about_container);
  backward_bottom_view.src = "backward_bottom_view.gif";
  makeElement("br", "spacing", null, about_container);
  let backward_top_view = makeElement("img", "backward_top_view", "gif_about_img", about_container);
  backward_top_view.src = "backward_top_view.gif";

  let p9 = makeElement("p", "p9", null, about_container);
  p9.innerText = "For faster travel, Mr. Battle Cat has a gallop option. This is a two-beat gait, using the thrust from the two back legs to propel himself forward. The front legs are extended out to stabilize the machine after the leap.";
  let gallop_forward_algorithm = makeElement("img", "gallop_forward_algorithm", "r_about_img", about_container);
  gallop_forward_algorithm.src = "gallop_forward_algorithm.jpeg";

  let p10 = makeElement("p", "p10", null, about_container);
  p10.innerText = "Galloping backwards is the reverse, but he's a bit too front heavy at the moment so he falls forwards a lot haha.";
  let gallop_backward_algorithm = makeElement("img", "gallop_backward_algorithm", "r_about_img", about_container);
  gallop_backward_algorithm.src = "gallop_backward_algorithm.jpeg";

  let p11 = makeElement("p", "p11", null, about_container);
  p11.innerText = "The circuit is relatively simple. A PCA9865 made controlling multiple servos via a single microcontroller relatively simple. I used a high current LiPo battery (7.4V 2S 450mah 50c) for optimal performance of the servos. This however required me to use a Mini 360 buck converter to step down the voltage from 7.4V to the accepted 6V of the PCA9865. I excluded the servos from the diagram, but intuitively they would be attached to the terminals 0-3 of the PCA9865. The microcontroller I used was an ESP32, though mine is a bit strange compared to the normal (DFROBOT FireBeetle Board-ESP32), with a way to directly connect a LiPo battery to it.";
  let circuit_diagram = makeElement("img", "circuit_diagram", "gif_about_img", about_container);
  circuit_diagram.src = "circuit_diagram.jpeg";
  makeElement("br", "spacing", null, about_container);
  let circuit_diagram_irl = makeElement("img", "circuit_diagram_irl", "gif_about_img", about_container);
  circuit_diagram_irl.src = "circuit_diagram_irl.jpg";

  let p12 = makeElement("p", "p12", null, about_container);
  p12.innerText = "In a previous project (Don Quixote), I used a WebSocket system to communicate with the ESP32, controlling the machine. The controls feedback of this system was slightly suboptimal, with chances of delays or cuts in communication. Furthermore, it relied on a WiFi connection, which may not always be guaranteed. As such, I wanted to find an alternative control system. I had a couple PlayStation controllers lying around, and I found out that it was possible to utilize the ESP32’s Bluetooth to connect the controller to such. Thus, a new control system was born! I am happy with the PlayStation controller’s capabilities and hope to make some more projects utilizing it! Anyways, that is all I have to say, hope you liked the project! Here’s a silly little demo video I made of it:";

  for (let i = 0; i < 10; i++) makeElement("br", "spacing", null, about_container);

  let about_return_btn = makeElement("button", "about_return_btn", null, r);
  about_return_btn.innerText = "Return";
  animateButton(about_return_btn);
  about_return_btn.addEventListener("click", () => { setTimeout(() => { menu_load(r); }, 600) });
}

function controls_load(r) {
  r.innerHTML = '';
  document.body.style = 'background-color: black;';
  let controls_popup_container = makeElement("div", "controls_popup_container", null, r);
  let controls_popup = makeElement("img", "controls_popup", null, controls_popup_container);
  controls_popup.src = "controls_bg.png";
  let controls_return_btn = makeElement("button", "controls_return_btn", null, controls_popup_container);
  controls_return_btn.innerText = "Return";
  animateButton(controls_return_btn);
  controls_return_btn.addEventListener("click", () => { setTimeout(() => { menu_load(r); }, 600) });
}

function onLoad(event) {
  root = document.getElementById("root");
  xp = Number(localStorage.getItem("xp")) || 0;
  window.localStorage.setItem("xp", xp + 1);
  title_load(root);
}