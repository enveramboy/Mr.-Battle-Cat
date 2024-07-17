#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include <Ps3Controller.h>

// PCA9685 SETUP
Adafruit_PWMServoDriver board = Adafruit_PWMServoDriver(0x40);
#define SERVO_MIN 125
#define SERVO_MAX 575

// GAIT & ANIMATIONS
int angleToPulse(int ang) { return map(ang, 0, 180, SERVO_MIN, SERVO_MAX); }

void idle() {
  board.setPWM(2, 0, angleToPulse(90));
  board.setPWM(0, 0, angleToPulse(90));
  board.setPWM(3, 0, angleToPulse(90));
  board.setPWM(1, 0, angleToPulse(100));
}

void sit() {
  board.setPWM(2, 0, angleToPulse(90));
  board.setPWM(3, 0, angleToPulse(90));
  board.setPWM(0, 0, angleToPulse(155));
  board.setPWM(1, 0, angleToPulse(35));
}

void wave(unsigned long spd) {
  unsigned long delta = millis() % spd;
  if (delta < (spd/2)) board.setPWM(3, 0, angleToPulse(180));
  else board.setPWM(3, 0, angleToPulse(160));
}

void greet(unsigned long start) {
  unsigned long delta = millis() - start;
  if (delta < 500) sit();
  else wave(200);
}

void right(unsigned long spd) {
  unsigned long delta = millis() % spd;
  if (delta < (1*spd)/3) {
    board.setPWM(2, 0, angleToPulse(45));
    board.setPWM(0, 0, angleToPulse(45));
    board.setPWM(3, 0, angleToPulse(135));
    board.setPWM(1, 0, angleToPulse(145));
  }
  else if (delta < (2*spd)/3) {
    board.setPWM(2, 0, angleToPulse(90));
    board.setPWM(0, 0, angleToPulse(90));
  }
  else {
    board.setPWM(3, 0, angleToPulse(90));
    board.setPWM(1, 0, angleToPulse(100));
  }
}

void left(unsigned long spd) {
  unsigned long delta = millis() % spd;
  if (delta < (1*spd)/3) {
    board.setPWM(2, 0, angleToPulse(45));
    board.setPWM(0, 0, angleToPulse(45));
    board.setPWM(3, 0, angleToPulse(135));
    board.setPWM(1, 0, angleToPulse(145));
  }
  else if (delta < (2*spd)/3) {
    board.setPWM(3, 0, angleToPulse(90));
    board.setPWM(1, 0, angleToPulse(100));
  }
  else {
    board.setPWM(2, 0, angleToPulse(90));
    board.setPWM(0, 0, angleToPulse(90));
  }
}

void trot_forward(unsigned long spd) {
  unsigned long delta = millis() % spd;
  if (delta < (1*spd)/4) {
    board.setPWM(2, 0, angleToPulse(45));
    board.setPWM(0, 0, angleToPulse(135));
    board.setPWM(3, 0, angleToPulse(90));
    board.setPWM(1, 0, angleToPulse(100));
  }
  else if (delta < (2*spd)/4) {
    board.setPWM(2, 0, angleToPulse(90));
    board.setPWM(0, 0, angleToPulse(90));
    board.setPWM(3, 0, angleToPulse(45));
    board.setPWM(1, 0, angleToPulse(145));
  }
  else if (delta < (3*spd)/4) {
    board.setPWM(2, 0, angleToPulse(90));
    board.setPWM(0, 0, angleToPulse(90));
    board.setPWM(3, 0, angleToPulse(135));
    board.setPWM(1, 0, angleToPulse(55));
  }
  else {
    board.setPWM(2, 0, angleToPulse(135));
    board.setPWM(0, 0, angleToPulse(45));
    board.setPWM(3, 0, angleToPulse(90));
    board.setPWM(1, 0, angleToPulse(100));
  }
}

void gallop_forward(unsigned long spd) {
  unsigned long delta = millis() % spd;
  if (delta < (spd/2)) {
    board.setPWM(2, 0, angleToPulse(90));
    board.setPWM(0, 0, angleToPulse(135));
    board.setPWM(3, 0, angleToPulse(90));
    board.setPWM(1, 0, angleToPulse(55));
  }
  else {
    board.setPWM(2, 0, angleToPulse(45));
    board.setPWM(0, 0, angleToPulse(90));
    board.setPWM(3, 0, angleToPulse(135));
    board.setPWM(1, 0, angleToPulse(100));
  }
}

void gallop_backward(unsigned long spd) {
  unsigned long delta = millis() % spd;
  if (delta < (spd/2)) {
    board.setPWM(2, 0, angleToPulse(135));
    board.setPWM(0, 0, angleToPulse(90));
    board.setPWM(3, 0, angleToPulse(45));
    board.setPWM(1, 0, angleToPulse(100));
  }
  else {
    board.setPWM(2, 0, angleToPulse(90));
    board.setPWM(0, 0, angleToPulse(45));
    board.setPWM(3, 0, angleToPulse(90));
    board.setPWM(1, 0, angleToPulse(145));
  }
}

void trot_backward(unsigned long spd) {
  unsigned long delta = millis() % spd;
  if (delta < ((1 * spd)/4)) {
    board.setPWM(2, 0, angleToPulse(135));
    board.setPWM(0, 0, angleToPulse(45));
    board.setPWM(3, 0, angleToPulse(90));
    board.setPWM(1, 0, angleToPulse(100));
  }
  else if (delta < ((2 * spd)/4)) {
    board.setPWM(2, 0, angleToPulse(90));
    board.setPWM(0, 0, angleToPulse(90));
    board.setPWM(3, 0, angleToPulse(135));
    board.setPWM(1, 0, angleToPulse(55));
  }
  else if (delta < ((3 * spd)/4)) {
    board.setPWM(2, 0, angleToPulse(90));
    board.setPWM(0, 0, angleToPulse(90));
    board.setPWM(3, 0, angleToPulse(45));
    board.setPWM(1, 0, angleToPulse(145));
  }
  else {
    board.setPWM(2, 0, angleToPulse(45));
    board.setPWM(0, 0, angleToPulse(135));
    board.setPWM(3, 0, angleToPulse(90));
    board.setPWM(1, 0, angleToPulse(100));
  }
}

void lay_down() {
  board.setPWM(2, 0, angleToPulse(15));
  board.setPWM(0, 0, angleToPulse(15));
  board.setPWM(3, 0, angleToPulse(165));
  board.setPWM(1, 0, angleToPulse(175));
}

// PS3 SETUP
volatile int states[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
volatile int pace = 500;

void notify() {
  // D-pad Buttons State
  if (Ps3.event.button_down.up) { states[0] = 1; }
  if (Ps3.event.button_up.up) {states[0] = 0; }

  if (Ps3.event.button_down.right) { states[1] = 1; }
  if (Ps3.event.button_up.right) { states[1] = 0; }

  if (Ps3.event.button_down.down) { states[2] = 1; }
  if (Ps3.event.button_up.down) { states[2] = 0; }

  if (Ps3.event.button_down.left) { states[3] = 1; }
  if (Ps3.event.button_up.left) { states[3] = 0; }

  // Middle Buttons State
  if (Ps3.event.button_down.select) { states[4] = 1; }
  if (Ps3.event.button_up.select) { states[4] = 0; }

  if (Ps3.event.button_down.ps) { states[5] = 1; }
  if (Ps3.event.button_up.ps) { states[5] = 0; }

  if (Ps3.event.button_down.start) { states[6] = 1; }
  if (Ps3.event.button_up.start) { states[6] = 0; }

  // Geometry Buttons State
  if (Ps3.event.button_down.triangle) { states[7] = 1; }
  if (Ps3.event.button_up.triangle) { states[7] = 0; }

  if (Ps3.event.button_down.circle) { states[8] = 1; }
  if (Ps3.event.button_up.circle) { states[8] = 0; }

  if (Ps3.event.button_down.cross) { states[9] = 1; }
  if (Ps3.event.button_up.cross) { states[9] = 0; }

  if (Ps3.event.button_down.square) { states[10] = 1; }
  if (Ps3.event.button_up.square) { states[10] = 0; }

  // Shoulder Buttons State
  if (Ps3.event.button_down.l1) { states[11] = 1; }
  if (Ps3.event.button_up.l1) { states[11] = 0; }

  if (Ps3.event.button_down.l2) { states[12] = 1; }
  if (Ps3.event.button_up.l2) { states[12] = 0; }

  if (Ps3.event.button_down.r1) { states[13] = 1; }
  if (Ps3.event.button_up.r1) { states[13] = 0; }

  if (Ps3.event.button_down.r2) { states[14] = 1;  }
  if (Ps3.event.button_up.r2) { states[14] = 0; }
}

void onConnect() { Ps3.setPlayer(7); }

void setup() {
  board.begin();
  board.setPWMFreq(60);
  Ps3.attach(notify);
  Ps3.attachOnConnect(onConnect);
  Ps3.begin("2c:81:58:3a:93:f7");
}

int greet_timeout = millis();
void loop() {
  if (!Ps3.isConnected()) return;


  if (states[10] == 0) greet_timeout = millis();


  int y = Ps3.data.analog.stick.ly;
  int x = Ps3.data.analog.stick.rx;
  if ((abs(y) > 10 || abs(x) > 10) && states[14] == 0) {
    if (abs(y) > abs(x) && abs(y) > 10) {
      if (y < 0) trot_forward(pace);
      else trot_backward(pace);
    }
    else {
      if (x < 0) left(pace/2);
      else right(pace/2);
    }
  }
  else if (abs(y) > 10 && states[14] == 1) {
    if (y < 0) gallop_forward(pace/2);
    else gallop_backward(pace/2);
  }

  else if (states[10] == 1) greet(greet_timeout);

  else if (states[12] == 1) lay_down();

  else idle();
}