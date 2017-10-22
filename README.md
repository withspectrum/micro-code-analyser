## `micro-code-analyser`

A tiny microservice to detect the language of a code snippet.

By running this microservice you won't have to add megabytes of JavaScript to your frontend just to detect what language a user is writing code in. This is especially useful for syntax highlighting in rich text/WYSIWYG editing scenarios!

> Note: Language detection is done via the [`lang-detector`](https://github.com/ts95/lang-detector) module. This means `micro-code-analyser` currently supports JavaScript, C, C++, Python, Java, HTML, CSS, Ruby, Go and PHP.

## Deployment

Your own `micro-code-analyser` is one click away!

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/withspectrum/micro-code-analyser)

You can also deploy with a single command from the terminal (assuming you have [`now`](https://now.sh) installed):

```sh
now withspectrum/micro-code-analyser
```

## Usage

To get the language of a code snippet `POST` the text to your `micro-code-analyser` instance. For example in JavaScript:

```JS
fetch('micro-code-analyser-asdf123.now.sh', {
  method: 'POST',
  body: 'const a = "b";',
}).then(res => {
  // The microservice will return a status of 400 for invalid
  // or undetected code snippets
  if (res.status < 200 || res.status > 400) return;

  return res.text();
}).then(language => {
  console.log(`The code was written in ${language}.`);
  // => "The code was written in JavaScript"
});
```

## Development

```sh
git clone git@github.com:withspectrum/micro-code-analyser
cd micro-code-analyser
npm i
npm run dev
```

## Updating

The master branch of this repository is what you will be deploying. To update to a new version with potential bugfixes, all you have to do is run the now command again and change the URL you call in your app! 👌

## License

Licensed under the MIT License, Copyright ©️ 2017  Space Program Inc. See [LICENSE.md](LICENSE.md) for more information.
