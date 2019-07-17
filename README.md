Image Tool
==================================

This is using ES6, Sharp, Express and Axios to manipulate images
- ES6 support via [babel](https://babeljs.io)
- Image Manipulation via [sharp](https://github.com/lovell/sharp)
- HTTP Server via [express](https://expressjs.com/)
- [Axios](https://github.com/axios/axios)

----------------------------
I suppose you have `node`, `git` and knowledge in this simple steps if not, see this tutorial about nvm installation [tutorial EN](https://www.keycdn.com/blog/node-version-manager), and [NVM official repository](https://github.com/nvm-sh/nvm) 

----------------------------

Installation

-------
Clone this repository

```
//SSH
git clone git@gitlab.com:e3opticalgroup/image-tool.git

//HTTPS
git clone https://gitlab.com/e3opticalgroup/image-tool.git
```

Move to work folder
```
cd image-tool/
```

Install sharp first to major dependencies issues
```
//yarn
yarn add sharp

//npm
npm -i sharp
```
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

Open this example: [http://localhost:8808/?q=80&w=1280&d=eo&f=catalog/product/l/e/lema21-douglas-preto-espelhado-cinza-c1-62-1.jpg](http://localhost:8808/?q=80&w=1280&d=eo&f=catalog/product/l/e/lema21-douglas-preto-espelhado-cinza-c1-62-1.jpg)

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
| d         | media base | `eo` for eotica or `el` for e-lens        |


#### Exaplained example
All configuration of the output image will be done by the url:

`q=80` -> means 80% of the quality (this value is default if you not pass this command)

`w=1280` -> the image will be 1280 pixels wide, and will maintain its aspect ratio

`h=500` -> (OPTIONAL) the image will be 500 pixels height

`f=image_path_catalog_forward` -> the image that you will do the conversion of size and/or quality. EX:`catalog/product/l/e/lema21-douglas-preto-espelhado-cinza-c1-62-1.jpg`

`d=el` -> call baseUrl from `https://media.e-lens.com.br/`

`d=eo` -> call baseUrl from `https://media.eotica.com.br/`

```
http://localhost:8808/?q=80&w=1280&d=eo&f=catalog/product/l/e/lema21-douglas-preto-espelhado-cinza-c1-62-1.jpg
```
Roadmap
-------
[ ] docker support

[X] base url config

[ ] more sharp options like: crop, color, rotation, [see more here](https://sharp.pixelplumbing.com/en/stable/api-operation/)


### License
## MIT

[Sharp Cropping]: http://sharp.pixelplumbing.com/en/stable/api-resize/#crop
