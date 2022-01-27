document.addEventListener('DOMContentLoaded', () => {

  // Unix timestamp (in seconds) to count down to
  var TimeLeft = (new Date("Feb 18, 2022").getTime() / 1000) + (86400 * 2) + 1;

  // Set up FlipDown
  var flipdown = new FlipDown(1645122601, {
    theme: 'light',
    countdown: true,})

    // Start the countdown
    .start()

    // Do something when the countdown ends
    .ifEnded(() => {
      console.log('The JPHS MUN 2022 has Started');
    });

  // Show version number
  var ver = document.getElementById('ver');
  ver.innerHTML = flipdown.version;
});
