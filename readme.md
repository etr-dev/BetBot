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
    <img src="https://cdn.discordapp.com/avatars/895536293356924979/fc5defd0df0442bd4a2326e552c11899.png?size=32" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">UFC Webscraping API</h3>

  <p align="center">
    A webscraper that retrieves and sends data about upcoming UFC Events through a REST api!
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

[![Product Name Screen Shot][product-screenshot]](https://example.com)

After searching the internet I was unable to find any free MMA/UFC APIs that displayed any betting odds, event details, etc. that were public. Any APIs that relayed this data was blocked behind extremely expensive paywalls meant to be bought by big companies. I wanted to make my own API to correct this issue.

Why is this project important:
* It pulls data directly from the official UFC website dynamically so it will stay in service even if I stop updating it.
* Plans to maybe host the API through my own server eventually
* This is 100% free and can be ran on local machines at no cost :smile:

This is part of the backend for my Discord sports betting bot. You can view my repo `BetBot` to look more into that.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Node.js](https://nodejs.org/en/)
* [Expressjs](https://expressjs.com/)
* [Puppeteer](https://github.com/puppeteer/puppeteer)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get started clone the repo to your local machine and begin installing it's dependencies. Since the node_modules folder is not included in the repo you will need to install the dependencies using node.

### Prerequisites

To run this app you will need to install nodejs

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/erobin27/BetBot.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. run the file `index.js` with node
   ```sh
    node ./server/index.js
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

I plan to use this API to create discord bots that can use the betting odds for UFC fights. This will be useful for sports discord servers, MMA servers, and for fun projects.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Dynamically return next UFC Event details
- [x] Return all upcoming UFC Events
- [] Get Winners of fights
- [] Get Event by URL
- [] API Key Generation
- [] Host on dedicated server

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

Distributed under the GNU General Public License v3.0. See `LICENSE.txt` for more information.

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
[product-screenshot]: images/screenshot.png
