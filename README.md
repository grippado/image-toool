Image Tool
==================================

This is using ES6, Sharp, Express and Axios to manipulate images
- Image Manipulation via [sharp](https://github.com/lovell/sharp)
- HTTP Server via [express](https://expressjs.com/)
- [Axios](https://github.com/axios/axios)
- 

----------------------------
I suppose you have `node`, `git` and knowledge in this simple steps if not, see this tutorial about nvm installation [tutorial EN](https://www.keycdn.com/blog/node-version-manager), and [NVM official repository](https://github.com/nvm-sh/nvm) 

----------------------------

Installation
Install all dependencies
```
//yarn
yarn

//npm
npm install
```

Run the server
```
//yarn
yarn start

//npm
npm run start
```
your console should return the message:
`Started on port 8808`

Open this example: [http://localhost:8808/?q=80&w=1280&f=https://gripp.tech/src/img/profile.jpg](http://localhost:8808/?q=80&w=1280&f=https://gripp.tech/src/img/profile.jpg)

----------------------------
## USAGE


#### Query Parameters

Here is a list of available commands.

| Parameter | Description  | Values         |
| --------- | ------------ | -------------- |
| blur      | Blur         | 0.3 - 1000     |
| h         | Height       | 0 - Infinity   |
| w         | Width        | 0 - Infinity   |
| q         | JPEG Quality | 0 - 100        |
| e         | Extension / Format of file | jpeg, png, webp or tiff |


#### Exaplained example
All configuration of the output image will be done by the url:

`q=80` -> means 80% of the quality (this value is default if you not pass this command)

`w=1280` -> the image will be 1280 pixels wide, and will maintain its aspect ratio

`h=500` -> (OPTIONAL) the image will be 500 pixels height

`f=absolut_path_image`


```
http://localhost:8808/?f=https://gripp.tech/src/img/profile.jpg&w=3000
```
Roadmap
-------
[ ] Convert to Typescript

[ ] more sharp options like: crop, color, rotation, [see more here](https://sharp.pixelplumbing.com/en/stable/api-operation/)

----
#### License
### MIT

[Sharp Cropping]: http://sharp.pixelplumbing.com/en/stable/api-resize/#crop
