---
title: Validation
slug: /validation
---

## Introduction

It's best practice to validate the incoming data, therefore you ensure that it complies with the requirements of your application. We provide several built-in pipes to validate incoming values. However, we are only going to focus on the `ValidationPipe` here. You can read about the others in [Pipes](pipes) section.

## ValidationPipe

The `ValidationPipe` uses [`class-validator`](https://github.com/typestack/class-validator) to validate and [`class-transformer`](https://github.com/typestack/class-transformer) to transform the incoming request body.

### Usage

We first create our `CreateUserDTO` DTO (data transfer object) to define the rules we need.

```ts
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  fullName: string;
}
```

And, later we make use of the `CreateUserDTO` in conjunction with `ValidationPipe` in our route handler.

```ts
// pages/api/user.ts
class UserHandler {
  @Post()
  createUser(@Body(ValidationPipe) body: CreateUserDTO) {
    return await DB.createUser(body);
  }
}

export default createHandler(UserHandler);
```

### Nested data

When your application expects a nested JSON object, you can easily define its shape in your DTOs and validate the incoming data against it.

```ts
import { createHandler, Body, Post, ValidationPipe } from '@storyofams/next-api-decorators';
import { Type, ValidateNested } from 'class-transformer';
import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

class Coordinate {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;
}

class MapMarker {
  @IsNotEmpty()
  @MinLength(3)
  label: string;

  @Type(() => Coordinate)
  @ValidateNested()
  @IsNotEmpty()
  coordinates: Coordinate;
}

class LocationHandler {
  @Post()
  saveLocation(@Body(ValidationPipe) body: MapMarker) {
    // Do something with the data.
    return `Location "${body.label}" saved.';
  }
}

export default createHandler(LocationHandler);
```

### Configuration

The options you can pass into `ValidationPipe` are inherited from `class-validator` with an additional `transformerOptions` property, which inherits the `class-transformer`'s `plainToClass` options.

🔗 [`class-validator` options](https://github.com/typestack/class-validator#passing-options)

🔗 [`class-transformer` options](https://github.com/typestack/class-transformer/blob/e5fc6bb7cfad7ba03f1b898f639cae4264bfbc12/src/interfaces/class-transformer-options.interface.ts#L6)