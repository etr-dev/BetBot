<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/erobin27/BetBot">
    <img src="/images/BetBotLogo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">BetBot</h3>

  <p align="center">
    A discord bot for betting on MMA with simulated money!
    <br />
    <a href="https://github.com/erobin27/BetBot"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot][product-screenshot2]]()

This is the very first discord sports betting bot created (That I was able to find)! This has not been done before due to the privitization of sports betting API's. I created my own UFC API `https://github.com/erobin27/UFC-API` that allows me to get data from the UFC website. I then present this data to the user through the discord bot. Users can place bets using their balance. User's balance, wagers, discord id, and past wagers are all stored in a mySQL database.

What is special about this project?
* Users are determined by their static discord UID so their account info is kept across any discord server
* Makes use of the new discord components which are not officially released yet
* Can place bets in real time and verify that the fights have not started/ended

I plan on continuing to build this project up. Currently the stack I am using is as follows.

FrontEnd: Python
  - Discord
  - Discord Components
  - requests
API: Node.js
  - Express
  - Puppetteer
Backend: mySQL

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Python](https://www.python.org/)
* [mySQL](https://www.mysql.com/)
* [Discord](https://discord.com/)
* [My UFC API](https://github.com/erobin27/UFC-API/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get started clone the repo to your local machine and begin installing it's dependencies. You will need to setup your discord token and database connection info in a `.env` file in the project directory.

### Prerequisites

To run this app you will need to install python, pip, and mySQL server

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/erobin27/BetBot.git
   ```
2. Install python dependecies with pip (will add requirement file soon)
   ```sh
   pip install ...
   ```
3. run the python file BetBot.py whilst UFC-API and mySQL database are running

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This is a way for people to make the UFC fights more engaging and fun without the harmful effects of gambling with real world money. I intend to make BetBot very interactive with leaderboards, xp ranks, etc. The betting process is not without risk since user balance is stored and after losing your money you would have to earn more but this definitely beats going broke in the real world from betting.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Allow users to place bets
- [x] Check bets and award winners
- [] list previous wagers and outcome
- [] Add a way for users to earn money
- [] Add a ranking/xp system
- [] Add server leaderboards

See the [open issues](https://github.com/erobin27/BetBot/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

You are not allowed to use this source code.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/erobin27/BetBot](https://github.com/erobin27/BetBot)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Credits

* [ReadMe Template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md)
<!--
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)
 -->
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/erobin27/BetBot.svg?style=for-the-badge
[contributors-url]: https://github.com/erobin27/BetBot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/erobin27/BetBot.svg?style=for-the-badge
[forks-url]: https://github.com/erobin27/BetBot/network/members
[stars-shield]: https://img.shields.io/github/stars/erobin27/BetBot.svg?style=for-the-badge
[stars-url]: https://github.com/erobin27/BetBot/stargazers
[issues-shield]: https://img.shields.io/github/issues/erobin27/BetBot.svg?style=for-the-badge
[issues-url]: https://github.com/erobin27/BetBot/issues
[license-shield]: https://img.shields.io/github/license/erobin27/BetBot.svg?style=for-the-badge
[license-url]: https://github.com/erobin27/BetBot/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/elijah-robinson98/
[product-screenshot]: images/Screenshot.png
[product-screenshot2]: images/Screenshot2.png
