<!-- markdownlint-disable no-inline-html -->
# @oniryk/dreamer-csv
<p align="center">
  <a href="https://www.npmjs.com/package/@oniryk/dreamer-csv">
  <img src="https://img.shields.io/npm/v/@oniryk/dreamer-csv.svg?style=for-the-badge" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@oniryk/dreamer-csv">
    <img src="https://img.shields.io/npm/dt/@oniryk/dreamer-csv.svg?style=for-the-badge" alt="npm total downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@oniryk/dreamer-csv">
    <img src="https://img.shields.io/npm/dm/@oniryk/dreamer-csv.svg?style=for-the-badge" alt="npm monthly downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@oniryk/dreamer-csv">
    <img src="https://img.shields.io/npm/l/@oniryk/dreamer-csv.svg?style=for-the-badge" alt="npm license" />
  </a>
  <a href="https://github.com/oniryk-labs/dreamer-csv/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/oniryk-labs/dreamer-csv/main.yml?style=for-the-badge&branch=main" alt="build status" />
  </a>
</p>

`@oniryk/dreamer-csv` is a wrapper of [`papaparse`](https://www.npmjs.com/package/papaparse) that provides a more convenient way to deliver [AdonisJS v6](https://adonisjs.com) responses in csv format.
This package is part of [`@oniryk/dreamer`](https://dreamer.oniryk.dev). It is not intended to be a general purpose package, but you can use it if you want.

## Installation
```bash
npm install @oniryk/dreamer-csv
```

## Usage
If you are using `@oniryk/dreamer`, you can use it like this:
```typescript
import Post from '#models/post'
import { index } from '@oniryk/dreamer/extensions/crud'
import csv from '@oniryk/dreamer-csv'

export default class PostsController {
  public index = index(Post, {
    formats: [ csv() ],
  })
  // ..
}
```

You also can use it directly:
```typescript
import { HttpContext } from '@adonisjs/core/http'
import xls from '@oniryk/dreamer-csv'

export default class PostsController {
  public async index(context: HttpContext) {
    const data = await Post.all()
    await csv()(context, data)
  }
}
```

## Settings
You can pass an object to the `csv` function to customize the output:
```typescript
csv({
  // Define the filename when downloading
  filename: 'posts.csv', // default is 'export.csv'

  // Define the columns to export
  columns: ['title', 'content', 'author', 'created_at'],

  // Define the delimiter
  delimiter: ';', // default is ','

  // Translate the column names
  i18n: {
    title: 'Title',
    content: 'Content',
  }
})
```
