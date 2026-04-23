export default function () {
  if (PROD) {
    const logo = `
__________________________________________________________________________________________________

 _______  ___   _  _______         _______  ___      _______  __   __  _______  __    _  _______ 
|   _   ||   | | ||   _   |       |       ||   |    |       ||  |_|  ||       ||  |  | ||       |
|  |_|  ||   |_| ||  |_|  | ____  |    ___||   |    |    ___||       ||    ___||   |_| ||_     _|
|       ||      _||       ||____| |   |___ |   |    |   |___ |       ||   |___ |       |  |   |  
|       ||     |_ |       |       |    ___||   |___ |    ___||       ||    ___||  _    |  |   |  
|   _   ||    _  ||   _   |       |   |___ |       ||   |___ | ||_|| ||   |___ | | |   |  |   |  
|__| |__||___| |_||__| |__|       |_______||_______||_______||_|   |_||_______||_|  |__|  |___|  
                                                                      
__________________________________________________________________________________________________

                                          author:Akaaaaa
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log('[Aka-Element]:dev mode...');
  }
}
