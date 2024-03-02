![image](https://github.com/lecepin/blog/assets/11046969/71f930b0-7831-44f3-8ff0-9d5fb41486f3)


## 1. JSON Schema

JSON Schema 是一种基于 JSON 的格式，用于描述 JSON 数据的结构和验证 JSON 数据。它为 JSON 数据提供了一个清晰的描述，可以用来验证、文档化，以及界定数据的接口。下面是 JSON Schema 的一些核心特点和应用方式的详细介绍：

1. **描述数据格式**：使用 JSON Schema，你可以详细描述 JSON 数据的预期结构，包括哪些字段是必需的，字段的数据类型是什么（如字符串、数字、布尔值等），以及字段的其他属性（如字符串的最小长度、最大长度、正则表达式模式等）。

2. **数据验证**：JSON Schema 最常见的用途之一是验证 JSON 数据。这意味着你可以根据定义的 schema 来检查 JSON 数据是否符合预期的格式，这在处理外部数据或 API 响应时尤其有用。如果数据不符合预期，你可以捕获这些错误并相应地处理它们。

3. **自动生成文档**：由于 JSON Schema 以标准化的格式描述了数据的结构，它可以被用来自动生成文档。这对于 API 的文档化尤其有用，因为开发者可以清晰地了解 API 接口期望接收什么样的数据，以及 API 响应将返回什么样的数据。

4. **简化开发流程**：通过使用 JSON Schema 来验证数据，开发者可以减少手动编写用于数据验证的代码量。这不仅可以提高开发效率，还可以减少由于数据错误导致的 bug。

5. **跨语言支持**：JSON Schema 有广泛的编程语言支持，包括但不限于 JavaScript、Python、Java 和 C#。这意味着无论你使用什么编程语言，你都可以找到库来帮助你处理 JSON Schema。

6. **版本控制**：JSON Schema 本身也在不断发展，目前有多个版本。每个版本添加了新的功能并对现有功能进行了改进。这使得 JSON Schema 可以适应不断变化的需求，同时保持向后兼容性。

通过使用 JSON Schema，开发者可以创建更加健壮和可靠的应用程序，确保数据的一致性和准确性，同时提高开发效率和降低维护成本。

## 2. 诞生背景

JSON Schema 的诞生背景源于对 JSON 数据格式的广泛采用及随之而来的需要验证 JSON 数据结构和内容的需求。JSON（JavaScript Object Notation）是一种轻量级的数据交换格式，易于人阅读和编写，同时也易于机器解析和生成。随着 Web 服务和应用程序接口（API）的快速发展，JSON 成为了在网络上进行数据交换的一种流行方式。

在这种背景下，开发者和系统架构师面临着如何有效验证 JSON 数据的挑战，特别是在复杂系统和跨团队合作中，确保数据的一致性和正确性变得尤为重要。以下是 JSON Schema 出现的几个关键背景因素：

1. **数据验证需求**：随着系统变得越来越依赖于动态和灵活的数据交换，需要一种可靠的方法来验证数据结构和内容，以防止错误数据导致的问题。

2. **自动化和标准化**：在自动化处理过程中，如 API 的调用和响应，需要有一个标准方式来描述和验证数据，从而减少人为干预和潜在的错误。

3. **跨语言和跨平台交互**：作为一种与语言无关的数据格式，JSON 被广泛应用于不同编程语言和平台之间的交互。JSON Schema 提供了一种统一的方式来定义和验证数据结构，促进了不同系统之间的互操作性。

4. **文档和协作**：JSON Schema 还可以用作文档，帮助开发者理解数据模型的结构，促进团队成员之间的沟通和协作。

因此，JSON Schema 应运而生，它不仅解决了数据验证的问题，还支持文档生成、自动化测试和开发工具集成等多种用途，成为了现代 Web 开发中不可或缺的一个组成部分。

## 3. TS vs JSON Schema

JSON Schema 和 TypeScript（TS）都用于确保数据结构的正确性，但它们在应用和目的上存在一些关键区别：

1. **应用范围**：

   - **JSON Schema**：主要用于描述和验证 JSON 数据结构，确保 JSON 数据符合预定义的格式。它是独立于编程语言的，可以用于网络传输中的数据验证、配置文件的验证等场景。
   - **TypeScript**：是 JavaScript 的一个超集，它添加了静态类型定义的功能。TypeScript 主要用于在编译时检查代码中的类型错误，提高开发效率和代码质量。

2. **执行时机**：

   - **JSON Schema**：通常在运行时用于验证数据，例如验证 API 请求/响应的数据结构。
   - **TypeScript**：在编译时进行类型检查，编译后的代码转换为普通的 JavaScript，运行时不会进行类型检查。

3. **目的和使用场景**：

   - **JSON Schema**：用于确保数据遵守特定的格式和结构，常用于 API 数据交换和配置数据验证。
   - **TypeScript**：旨在通过引入静态类型系统来提高代码的可维护性和可读性，主要用于开发阶段，帮助开发者捕捉类型相关的错误。

4. **语言和平台**：
   - **JSON Schema**：是一个独立的规范，可以与任何支持 JSON 的编程语言一起使用。
   - **TypeScript**：是一种编程语言，需要特定的编译器（TypeScript 编译器）将 TypeScript 代码转换为 JavaScript 代码。

JSON Schema 主要关注于运行时的数据验证，确保数据结构的正确性；而 TypeScript 关注于编译时的类型检查，提升开发过程中的代码质量和安全性。两者虽然在某些方面具有互补性，但服务于编程和数据处理的不同阶段和方面。

## 4. 示例

### 4.1 最小示例

```js
{
  "$id": "https://example.com/person.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Person",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "The person's first name."
    },
    "lastName": {
      "type": "string",
      "description": "The person's last name."
    },
    "age": {
      "description": "Age in years which must be equal to or greater than zero.",
      "type": "integer",
      "minimum": 0
    }
  }
}
```

数据：

```js
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 21
}
```

### 4.2 数组

```js
{
  "$id": "https://example.com/arrays.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "A representation of a person, company, organization, or place",
  "type": "object",
  "properties": {
    "fruits": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "vegetables": {
      "type": "array",
      "items": { "$ref": "#/$defs/veggie" }
    }
  },
  "$defs": {
    "veggie": {
      "type": "object",
      "required": [ "veggieName", "veggieLike" ],
      "properties": {
        "veggieName": {
          "type": "string",
          "description": "The name of the vegetable."
        },
        "veggieLike": {
          "type": "boolean",
          "description": "Do I like this vegetable?"
        }
      }
    }
  }
}
```

数据：

```js
{
  "fruits": [ "apple", "orange", "pear" ],
  "vegetables": [
    {
      "veggieName": "potato",
      "veggieLike": true
    },
    {
      "veggieName": "broccoli",
      "veggieLike": false
    }
  ]
}
```

### 4.3 枚举

```js
{
  "$id": "https://example.com/enumerated-values.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Enumerated Values",
  "type": "object",
  "properties": {
    "data": {
      "enum": [42, true, "hello", null, [1, 2, 3]]
    }
  }
}
```

数据：

```js
{
  "data": [1, 2, 3]
}
```

### 4.4 正则

```js
{
  "$id": "https://example.com/regex-pattern.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Regular Expression Pattern",
  "type": "object",
  "properties": {
    "code": {
      "type": "string",
      "pattern": "^[A-Z]{3}-\\d{3}$"
    }
  }
}
```

数据：

```js
{
  "code": "ABC-123"
}
```

### 4.5 嵌套

```js
{
  "$id": "https://example.com/complex-object.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Complex Object",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "integer",
      "minimum": 0
    },
    "address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postalCode": {
          "type": "string",
          "pattern": "\\d{5}"
        }
      },
      "required": ["street", "city", "state", "postalCode"]
    },
    "hobbies": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": ["name", "age"]
}
```

数据：

```js
{
  "name": "John Doe",
  "age": 25,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001"
  },
  "hobbies": ["reading", "running"]
}
```

### 4.6 条件验证

```js
{
  "$id": "https://example.com/conditional-validation-dependentRequired.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Conditional Validation with dependentRequired",
  "type": "object",
  "properties": {
    "foo": {
      "type": "boolean"
    },
    "bar": {
      "type": "string"
    }
  },
  "dependentRequired": {
    "foo": ["bar"]
  }
}
```

```js
{
  "$id": "https://example.com/conditional-validation-dependentSchemas.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Conditional Validation with dependentSchemas",
  "type": "object",
  "properties": {
    "foo": {
      "type": "boolean"
    },
    "propertiesCount": {
      "type": "integer",
      "minimum": 0
    }
  },
  "dependentSchemas": {
    "foo": {
      "required": ["propertiesCount"],
      "properties": {
        "propertiesCount": {
          "minimum": 7
        }
      }
    }
  }
}
```

```js
{
  "$id": "https://example.com/conditional-validation-if-else.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Conditional Validation with If-Else",
  "type": "object",
  "properties": {
    "isMember": {
      "type": "boolean"
    },
    "membershipNumber": {
      "type": "string"
    }
  },
  "required": ["isMember"],
  "if": {
    "properties": {
      "isMember": {
        "const": true
      }
    }
  },
  "then": {
    "properties": {
      "membershipNumber": {
        "type": "string",
        "minLength": 10,
        "maxLength": 10
      }
    }
  },
  "else": {
    "properties": {
      "membershipNumber": {
        "type": "string",
        "minLength": 15
      }
    }
  }
}
```

## 5. 验证器

JS 可使用 ajv：

![image](https://github.com/lecepin/blog/assets/11046969/f5988b8d-d44e-4680-8ea1-b5e91397f4c5)


```js
// or ESM/TypeScript import
import Ajv from "ajv";
// Node.js require:
const Ajv = require("ajv");

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const schema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" },
  },
  required: ["foo"],
  additionalProperties: false,
};

const data = {
  foo: 1,
  bar: "abc",
};

const validate = ajv.compile(schema);
const valid = validate(data);
if (!valid) console.log(validate.errors);
```

其他平台可参考官网：

![image](https://github.com/lecepin/blog/assets/11046969/28666d33-2495-432d-8af7-60889027333f)

