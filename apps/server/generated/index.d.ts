/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Evento
 *
 */
export type Evento = $Result.DefaultSelection<Prisma.$EventoPayload>;
/**
 * Model Categoria
 *
 */
export type Categoria = $Result.DefaultSelection<Prisma.$CategoriaPayload>;
/**
 * Model Usuario
 *
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>;
/**
 * Model Inscripcion
 *
 */
export type Inscripcion = $Result.DefaultSelection<Prisma.$InscripcionPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const EstadoEvento: {
    FINALIZADO: "FINALIZADO";
    EN_PROCESO: "EN_PROCESO";
    CANCELADO: "CANCELADO";
    PENDIENTE: "PENDIENTE";
  };

  export type EstadoEvento = (typeof EstadoEvento)[keyof typeof EstadoEvento];

  export const RolUsuario: {
    ADMIN: "ADMIN";
    ORGANIZADOR: "ORGANIZADOR";
    PARTICIPANTE: "PARTICIPANTE";
  };

  export type RolUsuario = (typeof RolUsuario)[keyof typeof RolUsuario];

  export const EstadoInscripcion: {
    CONFIRMADO: "CONFIRMADO";
    WAITLIST: "WAITLIST";
  };

  export type EstadoInscripcion =
    (typeof EstadoInscripcion)[keyof typeof EstadoInscripcion];
}

export type EstadoEvento = $Enums.EstadoEvento;

export const EstadoEvento: typeof $Enums.EstadoEvento;

export type RolUsuario = $Enums.RolUsuario;

export const RolUsuario: typeof $Enums.RolUsuario;

export type EstadoInscripcion = $Enums.EstadoInscripcion;

export const EstadoInscripcion: typeof $Enums.EstadoInscripcion;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Eventos
 * const eventos = await prisma.evento.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Eventos
   * const eventos = await prisma.evento.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: { maxWait?: number; timeout?: number },
  ): $Utils.JsPromise<R>;

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(
    command: Prisma.InputJsonObject,
  ): Prisma.PrismaPromise<Prisma.JsonObject>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.evento`: Exposes CRUD operations for the **Evento** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Eventos
   * const eventos = await prisma.evento.findMany()
   * ```
   */
  get evento(): Prisma.EventoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoria`: Exposes CRUD operations for the **Categoria** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Categorias
   * const categorias = await prisma.categoria.findMany()
   * ```
   */
  get categoria(): Prisma.CategoriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inscripcion`: Exposes CRUD operations for the **Inscripcion** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Inscripcions
   * const inscripcions = await prisma.inscripcion.findMany()
   * ```
   */
  get inscripcion(): Prisma.InscripcionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
    infer U
  >
    ? U
    : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T> = T extends Array<any>
    ? False
    : T extends Date
      ? False
      : T extends Uint8Array
        ? False
        : T extends bigint
          ? False
          : T extends object
            ? True
            : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown
      ? (k: U) => void
      : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1, A2> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Evento: "Evento";
    Categoria: "Categoria";
    Usuario: "Usuario";
    Inscripcion: "Inscripcion";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}>
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps: "evento" | "categoria" | "usuario" | "inscripcion";
      txIsolationLevel: never;
    };
    model: {
      Evento: {
        payload: Prisma.$EventoPayload<ExtArgs>;
        fields: Prisma.EventoFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.EventoFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventoPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.EventoFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>;
          };
          findFirst: {
            args: Prisma.EventoFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventoPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.EventoFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>;
          };
          findMany: {
            args: Prisma.EventoFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>[];
          };
          create: {
            args: Prisma.EventoCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>;
          };
          createMany: {
            args: Prisma.EventoCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          delete: {
            args: Prisma.EventoDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>;
          };
          update: {
            args: Prisma.EventoUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>;
          };
          deleteMany: {
            args: Prisma.EventoDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.EventoUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.EventoUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>;
          };
          aggregate: {
            args: Prisma.EventoAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateEvento>;
          };
          groupBy: {
            args: Prisma.EventoGroupByArgs<ExtArgs>;
            result: $Utils.Optional<EventoGroupByOutputType>[];
          };
          findRaw: {
            args: Prisma.EventoFindRawArgs<ExtArgs>;
            result: JsonObject;
          };
          aggregateRaw: {
            args: Prisma.EventoAggregateRawArgs<ExtArgs>;
            result: JsonObject;
          };
          count: {
            args: Prisma.EventoCountArgs<ExtArgs>;
            result: $Utils.Optional<EventoCountAggregateOutputType> | number;
          };
        };
      };
      Categoria: {
        payload: Prisma.$CategoriaPayload<ExtArgs>;
        fields: Prisma.CategoriaFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CategoriaFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CategoriaFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>;
          };
          findFirst: {
            args: Prisma.CategoriaFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CategoriaFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>;
          };
          findMany: {
            args: Prisma.CategoriaFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[];
          };
          create: {
            args: Prisma.CategoriaCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>;
          };
          createMany: {
            args: Prisma.CategoriaCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          delete: {
            args: Prisma.CategoriaDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>;
          };
          update: {
            args: Prisma.CategoriaUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>;
          };
          deleteMany: {
            args: Prisma.CategoriaDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CategoriaUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.CategoriaUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>;
          };
          aggregate: {
            args: Prisma.CategoriaAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCategoria>;
          };
          groupBy: {
            args: Prisma.CategoriaGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CategoriaGroupByOutputType>[];
          };
          findRaw: {
            args: Prisma.CategoriaFindRawArgs<ExtArgs>;
            result: JsonObject;
          };
          aggregateRaw: {
            args: Prisma.CategoriaAggregateRawArgs<ExtArgs>;
            result: JsonObject;
          };
          count: {
            args: Prisma.CategoriaCountArgs<ExtArgs>;
            result: $Utils.Optional<CategoriaCountAggregateOutputType> | number;
          };
        };
      };
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>;
        fields: Prisma.UsuarioFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[];
          };
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>;
          };
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUsuario>;
          };
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UsuarioGroupByOutputType>[];
          };
          findRaw: {
            args: Prisma.UsuarioFindRawArgs<ExtArgs>;
            result: JsonObject;
          };
          aggregateRaw: {
            args: Prisma.UsuarioAggregateRawArgs<ExtArgs>;
            result: JsonObject;
          };
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>;
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number;
          };
        };
      };
      Inscripcion: {
        payload: Prisma.$InscripcionPayload<ExtArgs>;
        fields: Prisma.InscripcionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.InscripcionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.InscripcionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>;
          };
          findFirst: {
            args: Prisma.InscripcionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.InscripcionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>;
          };
          findMany: {
            args: Prisma.InscripcionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>[];
          };
          create: {
            args: Prisma.InscripcionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>;
          };
          createMany: {
            args: Prisma.InscripcionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          delete: {
            args: Prisma.InscripcionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>;
          };
          update: {
            args: Prisma.InscripcionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>;
          };
          deleteMany: {
            args: Prisma.InscripcionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.InscripcionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.InscripcionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>;
          };
          aggregate: {
            args: Prisma.InscripcionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateInscripcion>;
          };
          groupBy: {
            args: Prisma.InscripcionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<InscripcionGroupByOutputType>[];
          };
          findRaw: {
            args: Prisma.InscripcionFindRawArgs<ExtArgs>;
            result: JsonObject;
          };
          aggregateRaw: {
            args: Prisma.InscripcionAggregateRawArgs<ExtArgs>;
            result: JsonObject;
          };
          count: {
            args: Prisma.InscripcionCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<InscripcionCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject;
          result: Prisma.JsonObject;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    evento?: EventoOmit;
    categoria?: CategoriaOmit;
    usuario?: UsuarioOmit;
    inscripcion?: InscripcionOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T["level"] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<
    LogLevel | LogDefinition
  >
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type EventoCountOutputType
   */

  export type EventoCountOutputType = {
    inscripciones: number;
  };

  export type EventoCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    inscripciones?: boolean | EventoCountOutputTypeCountInscripcionesArgs;
  };

  // Custom InputTypes
  /**
   * EventoCountOutputType without action
   */
  export type EventoCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the EventoCountOutputType
     */
    select?: EventoCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * EventoCountOutputType without action
   */
  export type EventoCountOutputTypeCountInscripcionesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InscripcionWhereInput;
  };

  /**
   * Count Type CategoriaCountOutputType
   */

  export type CategoriaCountOutputType = {
    eventos: number;
  };

  export type CategoriaCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    eventos?: boolean | CategoriaCountOutputTypeCountEventosArgs;
  };

  // Custom InputTypes
  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CategoriaCountOutputType
     */
    select?: CategoriaCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountEventosArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: EventoWhereInput;
  };

  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    eventos: number;
    inscripciones: number;
  };

  export type UsuarioCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    eventos?: boolean | UsuarioCountOutputTypeCountEventosArgs;
    inscripciones?: boolean | UsuarioCountOutputTypeCountInscripcionesArgs;
  };

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountEventosArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: EventoWhereInput;
  };

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountInscripcionesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InscripcionWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Evento
   */

  export type AggregateEvento = {
    _count: EventoCountAggregateOutputType | null;
    _avg: EventoAvgAggregateOutputType | null;
    _sum: EventoSumAggregateOutputType | null;
    _min: EventoMinAggregateOutputType | null;
    _max: EventoMaxAggregateOutputType | null;
  };

  export type EventoAvgAggregateOutputType = {
    duracionHoras: number | null;
    duracionMinutos: number | null;
    cupoMaximo: number | null;
    cupoMinimo: number | null;
    precio: number | null;
  };

  export type EventoSumAggregateOutputType = {
    duracionHoras: number | null;
    duracionMinutos: number | null;
    cupoMaximo: number | null;
    cupoMinimo: number | null;
    precio: number | null;
  };

  export type EventoMinAggregateOutputType = {
    id: string | null;
    titulo: string | null;
    descripcion: string | null;
    fechaInicio: Date | null;
    duracionHoras: number | null;
    duracionMinutos: number | null;
    ubicacion: string | null;
    cupoMaximo: number | null;
    cupoMinimo: number | null;
    precio: number | null;
    estado: $Enums.EstadoEvento | null;
    categoriaId: string | null;
    organizadorId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type EventoMaxAggregateOutputType = {
    id: string | null;
    titulo: string | null;
    descripcion: string | null;
    fechaInicio: Date | null;
    duracionHoras: number | null;
    duracionMinutos: number | null;
    ubicacion: string | null;
    cupoMaximo: number | null;
    cupoMinimo: number | null;
    precio: number | null;
    estado: $Enums.EstadoEvento | null;
    categoriaId: string | null;
    organizadorId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type EventoCountAggregateOutputType = {
    id: number;
    titulo: number;
    descripcion: number;
    fechaInicio: number;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: number;
    cupoMaximo: number;
    cupoMinimo: number;
    precio: number;
    estado: number;
    categoriaId: number;
    organizadorId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type EventoAvgAggregateInputType = {
    duracionHoras?: true;
    duracionMinutos?: true;
    cupoMaximo?: true;
    cupoMinimo?: true;
    precio?: true;
  };

  export type EventoSumAggregateInputType = {
    duracionHoras?: true;
    duracionMinutos?: true;
    cupoMaximo?: true;
    cupoMinimo?: true;
    precio?: true;
  };

  export type EventoMinAggregateInputType = {
    id?: true;
    titulo?: true;
    descripcion?: true;
    fechaInicio?: true;
    duracionHoras?: true;
    duracionMinutos?: true;
    ubicacion?: true;
    cupoMaximo?: true;
    cupoMinimo?: true;
    precio?: true;
    estado?: true;
    categoriaId?: true;
    organizadorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type EventoMaxAggregateInputType = {
    id?: true;
    titulo?: true;
    descripcion?: true;
    fechaInicio?: true;
    duracionHoras?: true;
    duracionMinutos?: true;
    ubicacion?: true;
    cupoMaximo?: true;
    cupoMinimo?: true;
    precio?: true;
    estado?: true;
    categoriaId?: true;
    organizadorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type EventoCountAggregateInputType = {
    id?: true;
    titulo?: true;
    descripcion?: true;
    fechaInicio?: true;
    duracionHoras?: true;
    duracionMinutos?: true;
    ubicacion?: true;
    cupoMaximo?: true;
    cupoMinimo?: true;
    precio?: true;
    estado?: true;
    categoriaId?: true;
    organizadorId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type EventoAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Evento to aggregate.
     */
    where?: EventoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Eventos to fetch.
     */
    orderBy?: EventoOrderByWithRelationInput | EventoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: EventoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Eventos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Eventos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Eventos
     **/
    _count?: true | EventoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: EventoAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: EventoSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: EventoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: EventoMaxAggregateInputType;
  };

  export type GetEventoAggregateType<T extends EventoAggregateArgs> = {
    [P in keyof T & keyof AggregateEvento]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvento[P]>
      : GetScalarType<T[P], AggregateEvento[P]>;
  };

  export type EventoGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: EventoWhereInput;
    orderBy?:
      | EventoOrderByWithAggregationInput
      | EventoOrderByWithAggregationInput[];
    by: EventoScalarFieldEnum[] | EventoScalarFieldEnum;
    having?: EventoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EventoCountAggregateInputType | true;
    _avg?: EventoAvgAggregateInputType;
    _sum?: EventoSumAggregateInputType;
    _min?: EventoMinAggregateInputType;
    _max?: EventoMaxAggregateInputType;
  };

  export type EventoGroupByOutputType = {
    id: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    categoriaId: string;
    organizadorId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: EventoCountAggregateOutputType | null;
    _avg: EventoAvgAggregateOutputType | null;
    _sum: EventoSumAggregateOutputType | null;
    _min: EventoMinAggregateOutputType | null;
    _max: EventoMaxAggregateOutputType | null;
  };

  type GetEventoGroupByPayload<T extends EventoGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<EventoGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof EventoGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventoGroupByOutputType[P]>
            : GetScalarType<T[P], EventoGroupByOutputType[P]>;
        }
      >
    >;

  export type EventoSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      titulo?: boolean;
      descripcion?: boolean;
      fechaInicio?: boolean;
      duracionHoras?: boolean;
      duracionMinutos?: boolean;
      ubicacion?: boolean;
      cupoMaximo?: boolean;
      cupoMinimo?: boolean;
      precio?: boolean;
      estado?: boolean;
      categoriaId?: boolean;
      organizadorId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      categoria?: boolean | CategoriaDefaultArgs<ExtArgs>;
      organizador?: boolean | UsuarioDefaultArgs<ExtArgs>;
      inscripciones?: boolean | Evento$inscripcionesArgs<ExtArgs>;
      _count?: boolean | EventoCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["evento"]
  >;

  export type EventoSelectScalar = {
    id?: boolean;
    titulo?: boolean;
    descripcion?: boolean;
    fechaInicio?: boolean;
    duracionHoras?: boolean;
    duracionMinutos?: boolean;
    ubicacion?: boolean;
    cupoMaximo?: boolean;
    cupoMinimo?: boolean;
    precio?: boolean;
    estado?: boolean;
    categoriaId?: boolean;
    organizadorId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type EventoOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "titulo"
    | "descripcion"
    | "fechaInicio"
    | "duracionHoras"
    | "duracionMinutos"
    | "ubicacion"
    | "cupoMaximo"
    | "cupoMinimo"
    | "precio"
    | "estado"
    | "categoriaId"
    | "organizadorId"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["evento"]
  >;
  export type EventoInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>;
    organizador?: boolean | UsuarioDefaultArgs<ExtArgs>;
    inscripciones?: boolean | Evento$inscripcionesArgs<ExtArgs>;
    _count?: boolean | EventoCountOutputTypeDefaultArgs<ExtArgs>;
  };

  export type $EventoPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Evento";
    objects: {
      categoria: Prisma.$CategoriaPayload<ExtArgs>;
      organizador: Prisma.$UsuarioPayload<ExtArgs>;
      inscripciones: Prisma.$InscripcionPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        titulo: string;
        descripcion: string;
        fechaInicio: Date;
        duracionHoras: number;
        duracionMinutos: number;
        ubicacion: string;
        cupoMaximo: number;
        cupoMinimo: number | null;
        precio: number;
        estado: $Enums.EstadoEvento;
        categoriaId: string;
        organizadorId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["evento"]
    >;
    composites: {};
  };

  type EventoGetPayload<
    S extends boolean | null | undefined | EventoDefaultArgs,
  > = $Result.GetResult<Prisma.$EventoPayload, S>;

  type EventoCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<EventoFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: EventoCountAggregateInputType | true;
  };

  export interface EventoDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Evento"];
      meta: { name: "Evento" };
    };
    /**
     * Find zero or one Evento that matches the filter.
     * @param {EventoFindUniqueArgs} args - Arguments to find a Evento
     * @example
     * // Get one Evento
     * const evento = await prisma.evento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventoFindUniqueArgs>(
      args: SelectSubset<T, EventoFindUniqueArgs<ExtArgs>>,
    ): Prisma__EventoClient<
      $Result.GetResult<
        Prisma.$EventoPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Evento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventoFindUniqueOrThrowArgs} args - Arguments to find a Evento
     * @example
     * // Get one Evento
     * const evento = await prisma.evento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventoFindUniqueOrThrowArgs>(
      args: SelectSubset<T, EventoFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__EventoClient<
      $Result.GetResult<
        Prisma.$EventoPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Evento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoFindFirstArgs} args - Arguments to find a Evento
     * @example
     * // Get one Evento
     * const evento = await prisma.evento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventoFindFirstArgs>(
      args?: SelectSubset<T, EventoFindFirstArgs<ExtArgs>>,
    ): Prisma__EventoClient<
      $Result.GetResult<
        Prisma.$EventoPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Evento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoFindFirstOrThrowArgs} args - Arguments to find a Evento
     * @example
     * // Get one Evento
     * const evento = await prisma.evento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EventoFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__EventoClient<
      $Result.GetResult<
        Prisma.$EventoPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Eventos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eventos
     * const eventos = await prisma.evento.findMany()
     *
     * // Get first 10 Eventos
     * const eventos = await prisma.evento.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const eventoWithIdOnly = await prisma.evento.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EventoFindManyArgs>(
      args?: SelectSubset<T, EventoFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$EventoPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Evento.
     * @param {EventoCreateArgs} args - Arguments to create a Evento.
     * @example
     * // Create one Evento
     * const Evento = await prisma.evento.create({
     *   data: {
     *     // ... data to create a Evento
     *   }
     * })
     *
     */
    create<T extends EventoCreateArgs>(
      args: SelectSubset<T, EventoCreateArgs<ExtArgs>>,
    ): Prisma__EventoClient<
      $Result.GetResult<
        Prisma.$EventoPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Eventos.
     * @param {EventoCreateManyArgs} args - Arguments to create many Eventos.
     * @example
     * // Create many Eventos
     * const evento = await prisma.evento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EventoCreateManyArgs>(
      args?: SelectSubset<T, EventoCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Evento.
     * @param {EventoDeleteArgs} args - Arguments to delete one Evento.
     * @example
     * // Delete one Evento
     * const Evento = await prisma.evento.delete({
     *   where: {
     *     // ... filter to delete one Evento
     *   }
     * })
     *
     */
    delete<T extends EventoDeleteArgs>(
      args: SelectSubset<T, EventoDeleteArgs<ExtArgs>>,
    ): Prisma__EventoClient<
      $Result.GetResult<
        Prisma.$EventoPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Evento.
     * @param {EventoUpdateArgs} args - Arguments to update one Evento.
     * @example
     * // Update one Evento
     * const evento = await prisma.evento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EventoUpdateArgs>(
      args: SelectSubset<T, EventoUpdateArgs<ExtArgs>>,
    ): Prisma__EventoClient<
      $Result.GetResult<
        Prisma.$EventoPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Eventos.
     * @param {EventoDeleteManyArgs} args - Arguments to filter Eventos to delete.
     * @example
     * // Delete a few Eventos
     * const { count } = await prisma.evento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EventoDeleteManyArgs>(
      args?: SelectSubset<T, EventoDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Eventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eventos
     * const evento = await prisma.evento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EventoUpdateManyArgs>(
      args: SelectSubset<T, EventoUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Evento.
     * @param {EventoUpsertArgs} args - Arguments to update or create a Evento.
     * @example
     * // Update or create a Evento
     * const evento = await prisma.evento.upsert({
     *   create: {
     *     // ... data to create a Evento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evento we want to update
     *   }
     * })
     */
    upsert<T extends EventoUpsertArgs>(
      args: SelectSubset<T, EventoUpsertArgs<ExtArgs>>,
    ): Prisma__EventoClient<
      $Result.GetResult<
        Prisma.$EventoPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Eventos that matches the filter.
     * @param {EventoFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const evento = await prisma.evento.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: EventoFindRawArgs): Prisma.PrismaPromise<JsonObject>;

    /**
     * Perform aggregation operations on a Evento.
     * @param {EventoAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const evento = await prisma.evento.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(
      args?: EventoAggregateRawArgs,
    ): Prisma.PrismaPromise<JsonObject>;

    /**
     * Count the number of Eventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoCountArgs} args - Arguments to filter Eventos to count.
     * @example
     * // Count the number of Eventos
     * const count = await prisma.evento.count({
     *   where: {
     *     // ... the filter for the Eventos we want to count
     *   }
     * })
     **/
    count<T extends EventoCountArgs>(
      args?: Subset<T, EventoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], EventoCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Evento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends EventoAggregateArgs>(
      args: Subset<T, EventoAggregateArgs>,
    ): Prisma.PrismaPromise<GetEventoAggregateType<T>>;

    /**
     * Group by Evento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends EventoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventoGroupByArgs["orderBy"] }
        : { orderBy?: EventoGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, EventoGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetEventoGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Evento model
     */
    readonly fields: EventoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Evento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventoClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    categoria<T extends CategoriaDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, CategoriaDefaultArgs<ExtArgs>>,
    ): Prisma__CategoriaClient<
      | $Result.GetResult<
          Prisma.$CategoriaPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    organizador<T extends UsuarioDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      | $Result.GetResult<
          Prisma.$UsuarioPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    inscripciones<T extends Evento$inscripcionesArgs<ExtArgs> = {}>(
      args?: Subset<T, Evento$inscripcionesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$InscripcionPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Evento model
   */
  interface EventoFieldRefs {
    readonly id: FieldRef<"Evento", "String">;
    readonly titulo: FieldRef<"Evento", "String">;
    readonly descripcion: FieldRef<"Evento", "String">;
    readonly fechaInicio: FieldRef<"Evento", "DateTime">;
    readonly duracionHoras: FieldRef<"Evento", "Int">;
    readonly duracionMinutos: FieldRef<"Evento", "Int">;
    readonly ubicacion: FieldRef<"Evento", "String">;
    readonly cupoMaximo: FieldRef<"Evento", "Int">;
    readonly cupoMinimo: FieldRef<"Evento", "Int">;
    readonly precio: FieldRef<"Evento", "Float">;
    readonly estado: FieldRef<"Evento", "EstadoEvento">;
    readonly categoriaId: FieldRef<"Evento", "String">;
    readonly organizadorId: FieldRef<"Evento", "String">;
    readonly createdAt: FieldRef<"Evento", "DateTime">;
    readonly updatedAt: FieldRef<"Evento", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Evento findUnique
   */
  export type EventoFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    /**
     * Filter, which Evento to fetch.
     */
    where: EventoWhereUniqueInput;
  };

  /**
   * Evento findUniqueOrThrow
   */
  export type EventoFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    /**
     * Filter, which Evento to fetch.
     */
    where: EventoWhereUniqueInput;
  };

  /**
   * Evento findFirst
   */
  export type EventoFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    /**
     * Filter, which Evento to fetch.
     */
    where?: EventoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Eventos to fetch.
     */
    orderBy?: EventoOrderByWithRelationInput | EventoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Eventos.
     */
    cursor?: EventoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Eventos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Eventos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Eventos.
     */
    distinct?: EventoScalarFieldEnum | EventoScalarFieldEnum[];
  };

  /**
   * Evento findFirstOrThrow
   */
  export type EventoFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    /**
     * Filter, which Evento to fetch.
     */
    where?: EventoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Eventos to fetch.
     */
    orderBy?: EventoOrderByWithRelationInput | EventoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Eventos.
     */
    cursor?: EventoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Eventos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Eventos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Eventos.
     */
    distinct?: EventoScalarFieldEnum | EventoScalarFieldEnum[];
  };

  /**
   * Evento findMany
   */
  export type EventoFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    /**
     * Filter, which Eventos to fetch.
     */
    where?: EventoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Eventos to fetch.
     */
    orderBy?: EventoOrderByWithRelationInput | EventoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Eventos.
     */
    cursor?: EventoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Eventos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Eventos.
     */
    skip?: number;
    distinct?: EventoScalarFieldEnum | EventoScalarFieldEnum[];
  };

  /**
   * Evento create
   */
  export type EventoCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    /**
     * The data needed to create a Evento.
     */
    data: XOR<EventoCreateInput, EventoUncheckedCreateInput>;
  };

  /**
   * Evento createMany
   */
  export type EventoCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Eventos.
     */
    data: EventoCreateManyInput | EventoCreateManyInput[];
  };

  /**
   * Evento update
   */
  export type EventoUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    /**
     * The data needed to update a Evento.
     */
    data: XOR<EventoUpdateInput, EventoUncheckedUpdateInput>;
    /**
     * Choose, which Evento to update.
     */
    where: EventoWhereUniqueInput;
  };

  /**
   * Evento updateMany
   */
  export type EventoUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Eventos.
     */
    data: XOR<EventoUpdateManyMutationInput, EventoUncheckedUpdateManyInput>;
    /**
     * Filter which Eventos to update
     */
    where?: EventoWhereInput;
    /**
     * Limit how many Eventos to update.
     */
    limit?: number;
  };

  /**
   * Evento upsert
   */
  export type EventoUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    /**
     * The filter to search for the Evento to update in case it exists.
     */
    where: EventoWhereUniqueInput;
    /**
     * In case the Evento found by the `where` argument doesn't exist, create a new Evento with this data.
     */
    create: XOR<EventoCreateInput, EventoUncheckedCreateInput>;
    /**
     * In case the Evento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventoUpdateInput, EventoUncheckedUpdateInput>;
  };

  /**
   * Evento delete
   */
  export type EventoDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    /**
     * Filter which Evento to delete.
     */
    where: EventoWhereUniqueInput;
  };

  /**
   * Evento deleteMany
   */
  export type EventoDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Eventos to delete
     */
    where?: EventoWhereInput;
    /**
     * Limit how many Eventos to delete.
     */
    limit?: number;
  };

  /**
   * Evento findRaw
   */
  export type EventoFindRawArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue;
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue;
  };

  /**
   * Evento aggregateRaw
   */
  export type EventoAggregateRawArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[];
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue;
  };

  /**
   * Evento.inscripciones
   */
  export type Evento$inscripcionesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    where?: InscripcionWhereInput;
    orderBy?:
      | InscripcionOrderByWithRelationInput
      | InscripcionOrderByWithRelationInput[];
    cursor?: InscripcionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[];
  };

  /**
   * Evento without action
   */
  export type EventoDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
  };

  /**
   * Model Categoria
   */

  export type AggregateCategoria = {
    _count: CategoriaCountAggregateOutputType | null;
    _min: CategoriaMinAggregateOutputType | null;
    _max: CategoriaMaxAggregateOutputType | null;
  };

  export type CategoriaMinAggregateOutputType = {
    id: string | null;
    nombre: string | null;
  };

  export type CategoriaMaxAggregateOutputType = {
    id: string | null;
    nombre: string | null;
  };

  export type CategoriaCountAggregateOutputType = {
    id: number;
    nombre: number;
    _all: number;
  };

  export type CategoriaMinAggregateInputType = {
    id?: true;
    nombre?: true;
  };

  export type CategoriaMaxAggregateInputType = {
    id?: true;
    nombre?: true;
  };

  export type CategoriaCountAggregateInputType = {
    id?: true;
    nombre?: true;
    _all?: true;
  };

  export type CategoriaAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Categoria to aggregate.
     */
    where?: CategoriaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categorias to fetch.
     */
    orderBy?:
      | CategoriaOrderByWithRelationInput
      | CategoriaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CategoriaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categorias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Categorias
     **/
    _count?: true | CategoriaCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CategoriaMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CategoriaMaxAggregateInputType;
  };

  export type GetCategoriaAggregateType<T extends CategoriaAggregateArgs> = {
    [P in keyof T & keyof AggregateCategoria]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria[P]>
      : GetScalarType<T[P], AggregateCategoria[P]>;
  };

  export type CategoriaGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CategoriaWhereInput;
    orderBy?:
      | CategoriaOrderByWithAggregationInput
      | CategoriaOrderByWithAggregationInput[];
    by: CategoriaScalarFieldEnum[] | CategoriaScalarFieldEnum;
    having?: CategoriaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CategoriaCountAggregateInputType | true;
    _min?: CategoriaMinAggregateInputType;
    _max?: CategoriaMaxAggregateInputType;
  };

  export type CategoriaGroupByOutputType = {
    id: string;
    nombre: string;
    _count: CategoriaCountAggregateOutputType | null;
    _min: CategoriaMinAggregateOutputType | null;
    _max: CategoriaMaxAggregateOutputType | null;
  };

  type GetCategoriaGroupByPayload<T extends CategoriaGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<CategoriaGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof CategoriaGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriaGroupByOutputType[P]>;
        }
      >
    >;

  export type CategoriaSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      nombre?: boolean;
      eventos?: boolean | Categoria$eventosArgs<ExtArgs>;
      _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["categoria"]
  >;

  export type CategoriaSelectScalar = {
    id?: boolean;
    nombre?: boolean;
  };

  export type CategoriaOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<"id" | "nombre", ExtArgs["result"]["categoria"]>;
  export type CategoriaInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    eventos?: boolean | Categoria$eventosArgs<ExtArgs>;
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>;
  };

  export type $CategoriaPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Categoria";
    objects: {
      eventos: Prisma.$EventoPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        nombre: string;
      },
      ExtArgs["result"]["categoria"]
    >;
    composites: {};
  };

  type CategoriaGetPayload<
    S extends boolean | null | undefined | CategoriaDefaultArgs,
  > = $Result.GetResult<Prisma.$CategoriaPayload, S>;

  type CategoriaCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    CategoriaFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: CategoriaCountAggregateInputType | true;
  };

  export interface CategoriaDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Categoria"];
      meta: { name: "Categoria" };
    };
    /**
     * Find zero or one Categoria that matches the filter.
     * @param {CategoriaFindUniqueArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriaFindUniqueArgs>(
      args: SelectSubset<T, CategoriaFindUniqueArgs<ExtArgs>>,
    ): Prisma__CategoriaClient<
      $Result.GetResult<
        Prisma.$CategoriaPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Categoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoriaFindUniqueOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriaFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CategoriaFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__CategoriaClient<
      $Result.GetResult<
        Prisma.$CategoriaPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Categoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriaFindFirstArgs>(
      args?: SelectSubset<T, CategoriaFindFirstArgs<ExtArgs>>,
    ): Prisma__CategoriaClient<
      $Result.GetResult<
        Prisma.$CategoriaPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Categoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriaFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CategoriaFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__CategoriaClient<
      $Result.GetResult<
        Prisma.$CategoriaPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categoria.findMany()
     *
     * // Get first 10 Categorias
     * const categorias = await prisma.categoria.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const categoriaWithIdOnly = await prisma.categoria.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CategoriaFindManyArgs>(
      args?: SelectSubset<T, CategoriaFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CategoriaPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Categoria.
     * @param {CategoriaCreateArgs} args - Arguments to create a Categoria.
     * @example
     * // Create one Categoria
     * const Categoria = await prisma.categoria.create({
     *   data: {
     *     // ... data to create a Categoria
     *   }
     * })
     *
     */
    create<T extends CategoriaCreateArgs>(
      args: SelectSubset<T, CategoriaCreateArgs<ExtArgs>>,
    ): Prisma__CategoriaClient<
      $Result.GetResult<
        Prisma.$CategoriaPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Categorias.
     * @param {CategoriaCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CategoriaCreateManyArgs>(
      args?: SelectSubset<T, CategoriaCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Categoria.
     * @param {CategoriaDeleteArgs} args - Arguments to delete one Categoria.
     * @example
     * // Delete one Categoria
     * const Categoria = await prisma.categoria.delete({
     *   where: {
     *     // ... filter to delete one Categoria
     *   }
     * })
     *
     */
    delete<T extends CategoriaDeleteArgs>(
      args: SelectSubset<T, CategoriaDeleteArgs<ExtArgs>>,
    ): Prisma__CategoriaClient<
      $Result.GetResult<
        Prisma.$CategoriaPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Categoria.
     * @param {CategoriaUpdateArgs} args - Arguments to update one Categoria.
     * @example
     * // Update one Categoria
     * const categoria = await prisma.categoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CategoriaUpdateArgs>(
      args: SelectSubset<T, CategoriaUpdateArgs<ExtArgs>>,
    ): Prisma__CategoriaClient<
      $Result.GetResult<
        Prisma.$CategoriaPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Categorias.
     * @param {CategoriaDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CategoriaDeleteManyArgs>(
      args?: SelectSubset<T, CategoriaDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CategoriaUpdateManyArgs>(
      args: SelectSubset<T, CategoriaUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Categoria.
     * @param {CategoriaUpsertArgs} args - Arguments to update or create a Categoria.
     * @example
     * // Update or create a Categoria
     * const categoria = await prisma.categoria.upsert({
     *   create: {
     *     // ... data to create a Categoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria we want to update
     *   }
     * })
     */
    upsert<T extends CategoriaUpsertArgs>(
      args: SelectSubset<T, CategoriaUpsertArgs<ExtArgs>>,
    ): Prisma__CategoriaClient<
      $Result.GetResult<
        Prisma.$CategoriaPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Categorias that matches the filter.
     * @param {CategoriaFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const categoria = await prisma.categoria.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CategoriaFindRawArgs): Prisma.PrismaPromise<JsonObject>;

    /**
     * Perform aggregation operations on a Categoria.
     * @param {CategoriaAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const categoria = await prisma.categoria.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(
      args?: CategoriaAggregateRawArgs,
    ): Prisma.PrismaPromise<JsonObject>;

    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categoria.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
     **/
    count<T extends CategoriaCountArgs>(
      args?: Subset<T, CategoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], CategoriaCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CategoriaAggregateArgs>(
      args: Subset<T, CategoriaAggregateArgs>,
    ): Prisma.PrismaPromise<GetCategoriaAggregateType<T>>;

    /**
     * Group by Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CategoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriaGroupByArgs["orderBy"] }
        : { orderBy?: CategoriaGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, CategoriaGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetCategoriaGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Categoria model
     */
    readonly fields: CategoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriaClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    eventos<T extends Categoria$eventosArgs<ExtArgs> = {}>(
      args?: Subset<T, Categoria$eventosArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$EventoPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Categoria model
   */
  interface CategoriaFieldRefs {
    readonly id: FieldRef<"Categoria", "String">;
    readonly nombre: FieldRef<"Categoria", "String">;
  }

  // Custom InputTypes
  /**
   * Categoria findUnique
   */
  export type CategoriaFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null;
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput;
  };

  /**
   * Categoria findUniqueOrThrow
   */
  export type CategoriaFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null;
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput;
  };

  /**
   * Categoria findFirst
   */
  export type CategoriaFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null;
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categorias to fetch.
     */
    orderBy?:
      | CategoriaOrderByWithRelationInput
      | CategoriaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categorias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[];
  };

  /**
   * Categoria findFirstOrThrow
   */
  export type CategoriaFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null;
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categorias to fetch.
     */
    orderBy?:
      | CategoriaOrderByWithRelationInput
      | CategoriaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categorias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[];
  };

  /**
   * Categoria findMany
   */
  export type CategoriaFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null;
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categorias to fetch.
     */
    orderBy?:
      | CategoriaOrderByWithRelationInput
      | CategoriaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Categorias.
     */
    cursor?: CategoriaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categorias.
     */
    skip?: number;
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[];
  };

  /**
   * Categoria create
   */
  export type CategoriaCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null;
    /**
     * The data needed to create a Categoria.
     */
    data: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>;
  };

  /**
   * Categoria createMany
   */
  export type CategoriaCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[];
  };

  /**
   * Categoria update
   */
  export type CategoriaUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null;
    /**
     * The data needed to update a Categoria.
     */
    data: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>;
    /**
     * Choose, which Categoria to update.
     */
    where: CategoriaWhereUniqueInput;
  };

  /**
   * Categoria updateMany
   */
  export type CategoriaUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Categorias.
     */
    data: XOR<
      CategoriaUpdateManyMutationInput,
      CategoriaUncheckedUpdateManyInput
    >;
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput;
    /**
     * Limit how many Categorias to update.
     */
    limit?: number;
  };

  /**
   * Categoria upsert
   */
  export type CategoriaUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null;
    /**
     * The filter to search for the Categoria to update in case it exists.
     */
    where: CategoriaWhereUniqueInput;
    /**
     * In case the Categoria found by the `where` argument doesn't exist, create a new Categoria with this data.
     */
    create: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>;
    /**
     * In case the Categoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>;
  };

  /**
   * Categoria delete
   */
  export type CategoriaDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null;
    /**
     * Filter which Categoria to delete.
     */
    where: CategoriaWhereUniqueInput;
  };

  /**
   * Categoria deleteMany
   */
  export type CategoriaDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Categorias to delete
     */
    where?: CategoriaWhereInput;
    /**
     * Limit how many Categorias to delete.
     */
    limit?: number;
  };

  /**
   * Categoria findRaw
   */
  export type CategoriaFindRawArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue;
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue;
  };

  /**
   * Categoria aggregateRaw
   */
  export type CategoriaAggregateRawArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[];
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue;
  };

  /**
   * Categoria.eventos
   */
  export type Categoria$eventosArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    where?: EventoWhereInput;
    orderBy?: EventoOrderByWithRelationInput | EventoOrderByWithRelationInput[];
    cursor?: EventoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: EventoScalarFieldEnum | EventoScalarFieldEnum[];
  };

  /**
   * Categoria without action
   */
  export type CategoriaDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null;
  };

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null;
    _min: UsuarioMinAggregateOutputType | null;
    _max: UsuarioMaxAggregateOutputType | null;
  };

  export type UsuarioMinAggregateOutputType = {
    id: string | null;
    nombre: string | null;
    email: string | null;
    rol: $Enums.RolUsuario | null;
  };

  export type UsuarioMaxAggregateOutputType = {
    id: string | null;
    nombre: string | null;
    email: string | null;
    rol: $Enums.RolUsuario | null;
  };

  export type UsuarioCountAggregateOutputType = {
    id: number;
    nombre: number;
    email: number;
    rol: number;
    _all: number;
  };

  export type UsuarioMinAggregateInputType = {
    id?: true;
    nombre?: true;
    email?: true;
    rol?: true;
  };

  export type UsuarioMaxAggregateInputType = {
    id?: true;
    nombre?: true;
    email?: true;
    rol?: true;
  };

  export type UsuarioCountAggregateInputType = {
    id?: true;
    nombre?: true;
    email?: true;
    rol?: true;
    _all?: true;
  };

  export type UsuarioAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Usuarios to fetch.
     */
    orderBy?:
      | UsuarioOrderByWithRelationInput
      | UsuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Usuarios
     **/
    _count?: true | UsuarioCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UsuarioMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UsuarioMaxAggregateInputType;
  };

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
    [P in keyof T & keyof AggregateUsuario]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>;
  };

  export type UsuarioGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UsuarioWhereInput;
    orderBy?:
      | UsuarioOrderByWithAggregationInput
      | UsuarioOrderByWithAggregationInput[];
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum;
    having?: UsuarioScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UsuarioCountAggregateInputType | true;
    _min?: UsuarioMinAggregateInputType;
    _max?: UsuarioMaxAggregateInputType;
  };

  export type UsuarioGroupByOutputType = {
    id: string;
    nombre: string;
    email: string;
    rol: $Enums.RolUsuario;
    _count: UsuarioCountAggregateOutputType | null;
    _min: UsuarioMinAggregateOutputType | null;
    _max: UsuarioMaxAggregateOutputType | null;
  };

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<UsuarioGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof UsuarioGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>;
        }
      >
    >;

  export type UsuarioSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      nombre?: boolean;
      email?: boolean;
      rol?: boolean;
      eventos?: boolean | Usuario$eventosArgs<ExtArgs>;
      inscripciones?: boolean | Usuario$inscripcionesArgs<ExtArgs>;
      _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["usuario"]
  >;

  export type UsuarioSelectScalar = {
    id?: boolean;
    nombre?: boolean;
    email?: boolean;
    rol?: boolean;
  };

  export type UsuarioOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "nombre" | "email" | "rol",
    ExtArgs["result"]["usuario"]
  >;
  export type UsuarioInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    eventos?: boolean | Usuario$eventosArgs<ExtArgs>;
    inscripciones?: boolean | Usuario$inscripcionesArgs<ExtArgs>;
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>;
  };

  export type $UsuarioPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Usuario";
    objects: {
      eventos: Prisma.$EventoPayload<ExtArgs>[];
      inscripciones: Prisma.$InscripcionPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        nombre: string;
        email: string;
        rol: $Enums.RolUsuario;
      },
      ExtArgs["result"]["usuario"]
    >;
    composites: {};
  };

  type UsuarioGetPayload<
    S extends boolean | null | undefined | UsuarioDefaultArgs,
  > = $Result.GetResult<Prisma.$UsuarioPayload, S>;

  type UsuarioCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UsuarioFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: UsuarioCountAggregateInputType | true;
  };

  export interface UsuarioDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Usuario"];
      meta: { name: "Usuario" };
    };
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(
      args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<
        Prisma.$UsuarioPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<
        Prisma.$UsuarioPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(
      args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<
        Prisma.$UsuarioPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<
        Prisma.$UsuarioPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     *
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UsuarioFindManyArgs>(
      args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UsuarioPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     *
     */
    create<T extends UsuarioCreateArgs>(
      args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<
        Prisma.$UsuarioPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UsuarioCreateManyArgs>(
      args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     *
     */
    delete<T extends UsuarioDeleteArgs>(
      args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<
        Prisma.$UsuarioPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UsuarioUpdateArgs>(
      args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<
        Prisma.$UsuarioPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(
      args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UsuarioUpdateManyArgs>(
      args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(
      args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      $Result.GetResult<
        Prisma.$UsuarioPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Usuarios that matches the filter.
     * @param {UsuarioFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const usuario = await prisma.usuario.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UsuarioFindRawArgs): Prisma.PrismaPromise<JsonObject>;

    /**
     * Perform aggregation operations on a Usuario.
     * @param {UsuarioAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const usuario = await prisma.usuario.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(
      args?: UsuarioAggregateRawArgs,
    ): Prisma.PrismaPromise<JsonObject>;

    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
     **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UsuarioCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UsuarioAggregateArgs>(
      args: Subset<T, UsuarioAggregateArgs>,
    ): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>;

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs["orderBy"] }
        : { orderBy?: UsuarioGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUsuarioGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Usuario model
     */
    readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    eventos<T extends Usuario$eventosArgs<ExtArgs> = {}>(
      args?: Subset<T, Usuario$eventosArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$EventoPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    inscripciones<T extends Usuario$inscripcionesArgs<ExtArgs> = {}>(
      args?: Subset<T, Usuario$inscripcionesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$InscripcionPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", "String">;
    readonly nombre: FieldRef<"Usuario", "String">;
    readonly email: FieldRef<"Usuario", "String">;
    readonly rol: FieldRef<"Usuario", "RolUsuario">;
  }

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput;
  };

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput;
  };

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Usuarios to fetch.
     */
    orderBy?:
      | UsuarioOrderByWithRelationInput
      | UsuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[];
  };

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Usuarios to fetch.
     */
    orderBy?:
      | UsuarioOrderByWithRelationInput
      | UsuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[];
  };

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Usuarios to fetch.
     */
    orderBy?:
      | UsuarioOrderByWithRelationInput
      | UsuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Usuarios.
     */
    skip?: number;
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[];
  };

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>;
  };

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[];
  };

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>;
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput;
  };

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>;
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput;
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number;
  };

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput;
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>;
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>;
  };

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput;
  };

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput;
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number;
  };

  /**
   * Usuario findRaw
   */
  export type UsuarioFindRawArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue;
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue;
  };

  /**
   * Usuario aggregateRaw
   */
  export type UsuarioAggregateRawArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[];
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue;
  };

  /**
   * Usuario.eventos
   */
  export type Usuario$eventosArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Evento
     */
    omit?: EventoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventoInclude<ExtArgs> | null;
    where?: EventoWhereInput;
    orderBy?: EventoOrderByWithRelationInput | EventoOrderByWithRelationInput[];
    cursor?: EventoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: EventoScalarFieldEnum | EventoScalarFieldEnum[];
  };

  /**
   * Usuario.inscripciones
   */
  export type Usuario$inscripcionesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    where?: InscripcionWhereInput;
    orderBy?:
      | InscripcionOrderByWithRelationInput
      | InscripcionOrderByWithRelationInput[];
    cursor?: InscripcionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[];
  };

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null;
  };

  /**
   * Model Inscripcion
   */

  export type AggregateInscripcion = {
    _count: InscripcionCountAggregateOutputType | null;
    _min: InscripcionMinAggregateOutputType | null;
    _max: InscripcionMaxAggregateOutputType | null;
  };

  export type InscripcionMinAggregateOutputType = {
    id: string | null;
    usuarioId: string | null;
    eventoId: string | null;
    estado: $Enums.EstadoInscripcion | null;
    fechaRegistro: Date | null;
  };

  export type InscripcionMaxAggregateOutputType = {
    id: string | null;
    usuarioId: string | null;
    eventoId: string | null;
    estado: $Enums.EstadoInscripcion | null;
    fechaRegistro: Date | null;
  };

  export type InscripcionCountAggregateOutputType = {
    id: number;
    usuarioId: number;
    eventoId: number;
    estado: number;
    fechaRegistro: number;
    _all: number;
  };

  export type InscripcionMinAggregateInputType = {
    id?: true;
    usuarioId?: true;
    eventoId?: true;
    estado?: true;
    fechaRegistro?: true;
  };

  export type InscripcionMaxAggregateInputType = {
    id?: true;
    usuarioId?: true;
    eventoId?: true;
    estado?: true;
    fechaRegistro?: true;
  };

  export type InscripcionCountAggregateInputType = {
    id?: true;
    usuarioId?: true;
    eventoId?: true;
    estado?: true;
    fechaRegistro?: true;
    _all?: true;
  };

  export type InscripcionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Inscripcion to aggregate.
     */
    where?: InscripcionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?:
      | InscripcionOrderByWithRelationInput
      | InscripcionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: InscripcionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Inscripcions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Inscripcions
     **/
    _count?: true | InscripcionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: InscripcionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: InscripcionMaxAggregateInputType;
  };

  export type GetInscripcionAggregateType<T extends InscripcionAggregateArgs> =
    {
      [P in keyof T & keyof AggregateInscripcion]: P extends "_count" | "count"
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregateInscripcion[P]>
        : GetScalarType<T[P], AggregateInscripcion[P]>;
    };

  export type InscripcionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InscripcionWhereInput;
    orderBy?:
      | InscripcionOrderByWithAggregationInput
      | InscripcionOrderByWithAggregationInput[];
    by: InscripcionScalarFieldEnum[] | InscripcionScalarFieldEnum;
    having?: InscripcionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InscripcionCountAggregateInputType | true;
    _min?: InscripcionMinAggregateInputType;
    _max?: InscripcionMaxAggregateInputType;
  };

  export type InscripcionGroupByOutputType = {
    id: string;
    usuarioId: string;
    eventoId: string;
    estado: $Enums.EstadoInscripcion;
    fechaRegistro: Date;
    _count: InscripcionCountAggregateOutputType | null;
    _min: InscripcionMinAggregateOutputType | null;
    _max: InscripcionMaxAggregateOutputType | null;
  };

  type GetInscripcionGroupByPayload<T extends InscripcionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<InscripcionGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof InscripcionGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InscripcionGroupByOutputType[P]>
            : GetScalarType<T[P], InscripcionGroupByOutputType[P]>;
        }
      >
    >;

  export type InscripcionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      usuarioId?: boolean;
      eventoId?: boolean;
      estado?: boolean;
      fechaRegistro?: boolean;
      usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
      evento?: boolean | EventoDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["inscripcion"]
  >;

  export type InscripcionSelectScalar = {
    id?: boolean;
    usuarioId?: boolean;
    eventoId?: boolean;
    estado?: boolean;
    fechaRegistro?: boolean;
  };

  export type InscripcionOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "usuarioId" | "eventoId" | "estado" | "fechaRegistro",
    ExtArgs["result"]["inscripcion"]
  >;
  export type InscripcionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>;
    evento?: boolean | EventoDefaultArgs<ExtArgs>;
  };

  export type $InscripcionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Inscripcion";
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>;
      evento: Prisma.$EventoPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        usuarioId: string;
        eventoId: string;
        estado: $Enums.EstadoInscripcion;
        fechaRegistro: Date;
      },
      ExtArgs["result"]["inscripcion"]
    >;
    composites: {};
  };

  type InscripcionGetPayload<
    S extends boolean | null | undefined | InscripcionDefaultArgs,
  > = $Result.GetResult<Prisma.$InscripcionPayload, S>;

  type InscripcionCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    InscripcionFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: InscripcionCountAggregateInputType | true;
  };

  export interface InscripcionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Inscripcion"];
      meta: { name: "Inscripcion" };
    };
    /**
     * Find zero or one Inscripcion that matches the filter.
     * @param {InscripcionFindUniqueArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InscripcionFindUniqueArgs>(
      args: SelectSubset<T, InscripcionFindUniqueArgs<ExtArgs>>,
    ): Prisma__InscripcionClient<
      $Result.GetResult<
        Prisma.$InscripcionPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Inscripcion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InscripcionFindUniqueOrThrowArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InscripcionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, InscripcionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__InscripcionClient<
      $Result.GetResult<
        Prisma.$InscripcionPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Inscripcion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindFirstArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InscripcionFindFirstArgs>(
      args?: SelectSubset<T, InscripcionFindFirstArgs<ExtArgs>>,
    ): Prisma__InscripcionClient<
      $Result.GetResult<
        Prisma.$InscripcionPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Inscripcion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindFirstOrThrowArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InscripcionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InscripcionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__InscripcionClient<
      $Result.GetResult<
        Prisma.$InscripcionPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Inscripcions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inscripcions
     * const inscripcions = await prisma.inscripcion.findMany()
     *
     * // Get first 10 Inscripcions
     * const inscripcions = await prisma.inscripcion.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const inscripcionWithIdOnly = await prisma.inscripcion.findMany({ select: { id: true } })
     *
     */
    findMany<T extends InscripcionFindManyArgs>(
      args?: SelectSubset<T, InscripcionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$InscripcionPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Inscripcion.
     * @param {InscripcionCreateArgs} args - Arguments to create a Inscripcion.
     * @example
     * // Create one Inscripcion
     * const Inscripcion = await prisma.inscripcion.create({
     *   data: {
     *     // ... data to create a Inscripcion
     *   }
     * })
     *
     */
    create<T extends InscripcionCreateArgs>(
      args: SelectSubset<T, InscripcionCreateArgs<ExtArgs>>,
    ): Prisma__InscripcionClient<
      $Result.GetResult<
        Prisma.$InscripcionPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Inscripcions.
     * @param {InscripcionCreateManyArgs} args - Arguments to create many Inscripcions.
     * @example
     * // Create many Inscripcions
     * const inscripcion = await prisma.inscripcion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends InscripcionCreateManyArgs>(
      args?: SelectSubset<T, InscripcionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Inscripcion.
     * @param {InscripcionDeleteArgs} args - Arguments to delete one Inscripcion.
     * @example
     * // Delete one Inscripcion
     * const Inscripcion = await prisma.inscripcion.delete({
     *   where: {
     *     // ... filter to delete one Inscripcion
     *   }
     * })
     *
     */
    delete<T extends InscripcionDeleteArgs>(
      args: SelectSubset<T, InscripcionDeleteArgs<ExtArgs>>,
    ): Prisma__InscripcionClient<
      $Result.GetResult<
        Prisma.$InscripcionPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Inscripcion.
     * @param {InscripcionUpdateArgs} args - Arguments to update one Inscripcion.
     * @example
     * // Update one Inscripcion
     * const inscripcion = await prisma.inscripcion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends InscripcionUpdateArgs>(
      args: SelectSubset<T, InscripcionUpdateArgs<ExtArgs>>,
    ): Prisma__InscripcionClient<
      $Result.GetResult<
        Prisma.$InscripcionPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Inscripcions.
     * @param {InscripcionDeleteManyArgs} args - Arguments to filter Inscripcions to delete.
     * @example
     * // Delete a few Inscripcions
     * const { count } = await prisma.inscripcion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends InscripcionDeleteManyArgs>(
      args?: SelectSubset<T, InscripcionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Inscripcions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inscripcions
     * const inscripcion = await prisma.inscripcion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends InscripcionUpdateManyArgs>(
      args: SelectSubset<T, InscripcionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Inscripcion.
     * @param {InscripcionUpsertArgs} args - Arguments to update or create a Inscripcion.
     * @example
     * // Update or create a Inscripcion
     * const inscripcion = await prisma.inscripcion.upsert({
     *   create: {
     *     // ... data to create a Inscripcion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inscripcion we want to update
     *   }
     * })
     */
    upsert<T extends InscripcionUpsertArgs>(
      args: SelectSubset<T, InscripcionUpsertArgs<ExtArgs>>,
    ): Prisma__InscripcionClient<
      $Result.GetResult<
        Prisma.$InscripcionPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Inscripcions that matches the filter.
     * @param {InscripcionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const inscripcion = await prisma.inscripcion.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: InscripcionFindRawArgs): Prisma.PrismaPromise<JsonObject>;

    /**
     * Perform aggregation operations on a Inscripcion.
     * @param {InscripcionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const inscripcion = await prisma.inscripcion.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(
      args?: InscripcionAggregateRawArgs,
    ): Prisma.PrismaPromise<JsonObject>;

    /**
     * Count the number of Inscripcions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionCountArgs} args - Arguments to filter Inscripcions to count.
     * @example
     * // Count the number of Inscripcions
     * const count = await prisma.inscripcion.count({
     *   where: {
     *     // ... the filter for the Inscripcions we want to count
     *   }
     * })
     **/
    count<T extends InscripcionCountArgs>(
      args?: Subset<T, InscripcionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], InscripcionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Inscripcion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends InscripcionAggregateArgs>(
      args: Subset<T, InscripcionAggregateArgs>,
    ): Prisma.PrismaPromise<GetInscripcionAggregateType<T>>;

    /**
     * Group by Inscripcion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends InscripcionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InscripcionGroupByArgs["orderBy"] }
        : { orderBy?: InscripcionGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, InscripcionGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetInscripcionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Inscripcion model
     */
    readonly fields: InscripcionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inscripcion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InscripcionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>,
    ): Prisma__UsuarioClient<
      | $Result.GetResult<
          Prisma.$UsuarioPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    evento<T extends EventoDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, EventoDefaultArgs<ExtArgs>>,
    ): Prisma__EventoClient<
      | $Result.GetResult<
          Prisma.$EventoPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Inscripcion model
   */
  interface InscripcionFieldRefs {
    readonly id: FieldRef<"Inscripcion", "String">;
    readonly usuarioId: FieldRef<"Inscripcion", "String">;
    readonly eventoId: FieldRef<"Inscripcion", "String">;
    readonly estado: FieldRef<"Inscripcion", "EstadoInscripcion">;
    readonly fechaRegistro: FieldRef<"Inscripcion", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Inscripcion findUnique
   */
  export type InscripcionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    /**
     * Filter, which Inscripcion to fetch.
     */
    where: InscripcionWhereUniqueInput;
  };

  /**
   * Inscripcion findUniqueOrThrow
   */
  export type InscripcionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    /**
     * Filter, which Inscripcion to fetch.
     */
    where: InscripcionWhereUniqueInput;
  };

  /**
   * Inscripcion findFirst
   */
  export type InscripcionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    /**
     * Filter, which Inscripcion to fetch.
     */
    where?: InscripcionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?:
      | InscripcionOrderByWithRelationInput
      | InscripcionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Inscripcions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Inscripcions.
     */
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[];
  };

  /**
   * Inscripcion findFirstOrThrow
   */
  export type InscripcionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    /**
     * Filter, which Inscripcion to fetch.
     */
    where?: InscripcionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?:
      | InscripcionOrderByWithRelationInput
      | InscripcionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Inscripcions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Inscripcions.
     */
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[];
  };

  /**
   * Inscripcion findMany
   */
  export type InscripcionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    /**
     * Filter, which Inscripcions to fetch.
     */
    where?: InscripcionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?:
      | InscripcionOrderByWithRelationInput
      | InscripcionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Inscripcions.
     */
    skip?: number;
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[];
  };

  /**
   * Inscripcion create
   */
  export type InscripcionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Inscripcion.
     */
    data: XOR<InscripcionCreateInput, InscripcionUncheckedCreateInput>;
  };

  /**
   * Inscripcion createMany
   */
  export type InscripcionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Inscripcions.
     */
    data: InscripcionCreateManyInput | InscripcionCreateManyInput[];
  };

  /**
   * Inscripcion update
   */
  export type InscripcionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Inscripcion.
     */
    data: XOR<InscripcionUpdateInput, InscripcionUncheckedUpdateInput>;
    /**
     * Choose, which Inscripcion to update.
     */
    where: InscripcionWhereUniqueInput;
  };

  /**
   * Inscripcion updateMany
   */
  export type InscripcionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Inscripcions.
     */
    data: XOR<
      InscripcionUpdateManyMutationInput,
      InscripcionUncheckedUpdateManyInput
    >;
    /**
     * Filter which Inscripcions to update
     */
    where?: InscripcionWhereInput;
    /**
     * Limit how many Inscripcions to update.
     */
    limit?: number;
  };

  /**
   * Inscripcion upsert
   */
  export type InscripcionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Inscripcion to update in case it exists.
     */
    where: InscripcionWhereUniqueInput;
    /**
     * In case the Inscripcion found by the `where` argument doesn't exist, create a new Inscripcion with this data.
     */
    create: XOR<InscripcionCreateInput, InscripcionUncheckedCreateInput>;
    /**
     * In case the Inscripcion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InscripcionUpdateInput, InscripcionUncheckedUpdateInput>;
  };

  /**
   * Inscripcion delete
   */
  export type InscripcionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
    /**
     * Filter which Inscripcion to delete.
     */
    where: InscripcionWhereUniqueInput;
  };

  /**
   * Inscripcion deleteMany
   */
  export type InscripcionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Inscripcions to delete
     */
    where?: InscripcionWhereInput;
    /**
     * Limit how many Inscripcions to delete.
     */
    limit?: number;
  };

  /**
   * Inscripcion findRaw
   */
  export type InscripcionFindRawArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue;
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue;
  };

  /**
   * Inscripcion aggregateRaw
   */
  export type InscripcionAggregateRawArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[];
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue;
  };

  /**
   * Inscripcion without action
   */
  export type InscripcionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const EventoScalarFieldEnum: {
    id: "id";
    titulo: "titulo";
    descripcion: "descripcion";
    fechaInicio: "fechaInicio";
    duracionHoras: "duracionHoras";
    duracionMinutos: "duracionMinutos";
    ubicacion: "ubicacion";
    cupoMaximo: "cupoMaximo";
    cupoMinimo: "cupoMinimo";
    precio: "precio";
    estado: "estado";
    categoriaId: "categoriaId";
    organizadorId: "organizadorId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type EventoScalarFieldEnum =
    (typeof EventoScalarFieldEnum)[keyof typeof EventoScalarFieldEnum];

  export const CategoriaScalarFieldEnum: {
    id: "id";
    nombre: "nombre";
  };

  export type CategoriaScalarFieldEnum =
    (typeof CategoriaScalarFieldEnum)[keyof typeof CategoriaScalarFieldEnum];

  export const UsuarioScalarFieldEnum: {
    id: "id";
    nombre: "nombre";
    email: "email";
    rol: "rol";
  };

  export type UsuarioScalarFieldEnum =
    (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum];

  export const InscripcionScalarFieldEnum: {
    id: "id";
    usuarioId: "usuarioId";
    eventoId: "eventoId";
    estado: "estado";
    fechaRegistro: "fechaRegistro";
  };

  export type InscripcionScalarFieldEnum =
    (typeof InscripcionScalarFieldEnum)[keyof typeof InscripcionScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float"
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float[]"
  >;

  /**
   * Reference to a field of type 'EstadoEvento'
   */
  export type EnumEstadoEventoFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "EstadoEvento"
  >;

  /**
   * Reference to a field of type 'EstadoEvento[]'
   */
  export type ListEnumEstadoEventoFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "EstadoEvento[]">;

  /**
   * Reference to a field of type 'RolUsuario'
   */
  export type EnumRolUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "RolUsuario"
  >;

  /**
   * Reference to a field of type 'RolUsuario[]'
   */
  export type ListEnumRolUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "RolUsuario[]"
  >;

  /**
   * Reference to a field of type 'EstadoInscripcion'
   */
  export type EnumEstadoInscripcionFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "EstadoInscripcion">;

  /**
   * Reference to a field of type 'EstadoInscripcion[]'
   */
  export type ListEnumEstadoInscripcionFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "EstadoInscripcion[]">;

  /**
   * Deep Input Types
   */

  export type EventoWhereInput = {
    AND?: EventoWhereInput | EventoWhereInput[];
    OR?: EventoWhereInput[];
    NOT?: EventoWhereInput | EventoWhereInput[];
    id?: StringFilter<"Evento"> | string;
    titulo?: StringFilter<"Evento"> | string;
    descripcion?: StringFilter<"Evento"> | string;
    fechaInicio?: DateTimeFilter<"Evento"> | Date | string;
    duracionHoras?: IntFilter<"Evento"> | number;
    duracionMinutos?: IntFilter<"Evento"> | number;
    ubicacion?: StringFilter<"Evento"> | string;
    cupoMaximo?: IntFilter<"Evento"> | number;
    cupoMinimo?: IntNullableFilter<"Evento"> | number | null;
    precio?: FloatFilter<"Evento"> | number;
    estado?: EnumEstadoEventoFilter<"Evento"> | $Enums.EstadoEvento;
    categoriaId?: StringFilter<"Evento"> | string;
    organizadorId?: StringFilter<"Evento"> | string;
    createdAt?: DateTimeFilter<"Evento"> | Date | string;
    updatedAt?: DateTimeFilter<"Evento"> | Date | string;
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>;
    organizador?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>;
    inscripciones?: InscripcionListRelationFilter;
  };

  export type EventoOrderByWithRelationInput = {
    id?: SortOrder;
    titulo?: SortOrder;
    descripcion?: SortOrder;
    fechaInicio?: SortOrder;
    duracionHoras?: SortOrder;
    duracionMinutos?: SortOrder;
    ubicacion?: SortOrder;
    cupoMaximo?: SortOrder;
    cupoMinimo?: SortOrder;
    precio?: SortOrder;
    estado?: SortOrder;
    categoriaId?: SortOrder;
    organizadorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    categoria?: CategoriaOrderByWithRelationInput;
    organizador?: UsuarioOrderByWithRelationInput;
    inscripciones?: InscripcionOrderByRelationAggregateInput;
  };

  export type EventoWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: EventoWhereInput | EventoWhereInput[];
      OR?: EventoWhereInput[];
      NOT?: EventoWhereInput | EventoWhereInput[];
      titulo?: StringFilter<"Evento"> | string;
      descripcion?: StringFilter<"Evento"> | string;
      fechaInicio?: DateTimeFilter<"Evento"> | Date | string;
      duracionHoras?: IntFilter<"Evento"> | number;
      duracionMinutos?: IntFilter<"Evento"> | number;
      ubicacion?: StringFilter<"Evento"> | string;
      cupoMaximo?: IntFilter<"Evento"> | number;
      cupoMinimo?: IntNullableFilter<"Evento"> | number | null;
      precio?: FloatFilter<"Evento"> | number;
      estado?: EnumEstadoEventoFilter<"Evento"> | $Enums.EstadoEvento;
      categoriaId?: StringFilter<"Evento"> | string;
      organizadorId?: StringFilter<"Evento"> | string;
      createdAt?: DateTimeFilter<"Evento"> | Date | string;
      updatedAt?: DateTimeFilter<"Evento"> | Date | string;
      categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>;
      organizador?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>;
      inscripciones?: InscripcionListRelationFilter;
    },
    "id"
  >;

  export type EventoOrderByWithAggregationInput = {
    id?: SortOrder;
    titulo?: SortOrder;
    descripcion?: SortOrder;
    fechaInicio?: SortOrder;
    duracionHoras?: SortOrder;
    duracionMinutos?: SortOrder;
    ubicacion?: SortOrder;
    cupoMaximo?: SortOrder;
    cupoMinimo?: SortOrder;
    precio?: SortOrder;
    estado?: SortOrder;
    categoriaId?: SortOrder;
    organizadorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: EventoCountOrderByAggregateInput;
    _avg?: EventoAvgOrderByAggregateInput;
    _max?: EventoMaxOrderByAggregateInput;
    _min?: EventoMinOrderByAggregateInput;
    _sum?: EventoSumOrderByAggregateInput;
  };

  export type EventoScalarWhereWithAggregatesInput = {
    AND?:
      | EventoScalarWhereWithAggregatesInput
      | EventoScalarWhereWithAggregatesInput[];
    OR?: EventoScalarWhereWithAggregatesInput[];
    NOT?:
      | EventoScalarWhereWithAggregatesInput
      | EventoScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Evento"> | string;
    titulo?: StringWithAggregatesFilter<"Evento"> | string;
    descripcion?: StringWithAggregatesFilter<"Evento"> | string;
    fechaInicio?: DateTimeWithAggregatesFilter<"Evento"> | Date | string;
    duracionHoras?: IntWithAggregatesFilter<"Evento"> | number;
    duracionMinutos?: IntWithAggregatesFilter<"Evento"> | number;
    ubicacion?: StringWithAggregatesFilter<"Evento"> | string;
    cupoMaximo?: IntWithAggregatesFilter<"Evento"> | number;
    cupoMinimo?: IntNullableWithAggregatesFilter<"Evento"> | number | null;
    precio?: FloatWithAggregatesFilter<"Evento"> | number;
    estado?:
      | EnumEstadoEventoWithAggregatesFilter<"Evento">
      | $Enums.EstadoEvento;
    categoriaId?: StringWithAggregatesFilter<"Evento"> | string;
    organizadorId?: StringWithAggregatesFilter<"Evento"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Evento"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Evento"> | Date | string;
  };

  export type CategoriaWhereInput = {
    AND?: CategoriaWhereInput | CategoriaWhereInput[];
    OR?: CategoriaWhereInput[];
    NOT?: CategoriaWhereInput | CategoriaWhereInput[];
    id?: StringFilter<"Categoria"> | string;
    nombre?: StringFilter<"Categoria"> | string;
    eventos?: EventoListRelationFilter;
  };

  export type CategoriaOrderByWithRelationInput = {
    id?: SortOrder;
    nombre?: SortOrder;
    eventos?: EventoOrderByRelationAggregateInput;
  };

  export type CategoriaWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      nombre?: string;
      AND?: CategoriaWhereInput | CategoriaWhereInput[];
      OR?: CategoriaWhereInput[];
      NOT?: CategoriaWhereInput | CategoriaWhereInput[];
      eventos?: EventoListRelationFilter;
    },
    "id" | "nombre"
  >;

  export type CategoriaOrderByWithAggregationInput = {
    id?: SortOrder;
    nombre?: SortOrder;
    _count?: CategoriaCountOrderByAggregateInput;
    _max?: CategoriaMaxOrderByAggregateInput;
    _min?: CategoriaMinOrderByAggregateInput;
  };

  export type CategoriaScalarWhereWithAggregatesInput = {
    AND?:
      | CategoriaScalarWhereWithAggregatesInput
      | CategoriaScalarWhereWithAggregatesInput[];
    OR?: CategoriaScalarWhereWithAggregatesInput[];
    NOT?:
      | CategoriaScalarWhereWithAggregatesInput
      | CategoriaScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Categoria"> | string;
    nombre?: StringWithAggregatesFilter<"Categoria"> | string;
  };

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[];
    OR?: UsuarioWhereInput[];
    NOT?: UsuarioWhereInput | UsuarioWhereInput[];
    id?: StringFilter<"Usuario"> | string;
    nombre?: StringFilter<"Usuario"> | string;
    email?: StringFilter<"Usuario"> | string;
    rol?: EnumRolUsuarioFilter<"Usuario"> | $Enums.RolUsuario;
    eventos?: EventoListRelationFilter;
    inscripciones?: InscripcionListRelationFilter;
  };

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder;
    nombre?: SortOrder;
    email?: SortOrder;
    rol?: SortOrder;
    eventos?: EventoOrderByRelationAggregateInput;
    inscripciones?: InscripcionOrderByRelationAggregateInput;
  };

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UsuarioWhereInput | UsuarioWhereInput[];
      OR?: UsuarioWhereInput[];
      NOT?: UsuarioWhereInput | UsuarioWhereInput[];
      nombre?: StringFilter<"Usuario"> | string;
      rol?: EnumRolUsuarioFilter<"Usuario"> | $Enums.RolUsuario;
      eventos?: EventoListRelationFilter;
      inscripciones?: InscripcionListRelationFilter;
    },
    "id" | "email"
  >;

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder;
    nombre?: SortOrder;
    email?: SortOrder;
    rol?: SortOrder;
    _count?: UsuarioCountOrderByAggregateInput;
    _max?: UsuarioMaxOrderByAggregateInput;
    _min?: UsuarioMinOrderByAggregateInput;
  };

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?:
      | UsuarioScalarWhereWithAggregatesInput
      | UsuarioScalarWhereWithAggregatesInput[];
    OR?: UsuarioScalarWhereWithAggregatesInput[];
    NOT?:
      | UsuarioScalarWhereWithAggregatesInput
      | UsuarioScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Usuario"> | string;
    nombre?: StringWithAggregatesFilter<"Usuario"> | string;
    email?: StringWithAggregatesFilter<"Usuario"> | string;
    rol?: EnumRolUsuarioWithAggregatesFilter<"Usuario"> | $Enums.RolUsuario;
  };

  export type InscripcionWhereInput = {
    AND?: InscripcionWhereInput | InscripcionWhereInput[];
    OR?: InscripcionWhereInput[];
    NOT?: InscripcionWhereInput | InscripcionWhereInput[];
    id?: StringFilter<"Inscripcion"> | string;
    usuarioId?: StringFilter<"Inscripcion"> | string;
    eventoId?: StringFilter<"Inscripcion"> | string;
    estado?:
      | EnumEstadoInscripcionFilter<"Inscripcion">
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFilter<"Inscripcion"> | Date | string;
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>;
    evento?: XOR<EventoScalarRelationFilter, EventoWhereInput>;
  };

  export type InscripcionOrderByWithRelationInput = {
    id?: SortOrder;
    usuarioId?: SortOrder;
    eventoId?: SortOrder;
    estado?: SortOrder;
    fechaRegistro?: SortOrder;
    usuario?: UsuarioOrderByWithRelationInput;
    evento?: EventoOrderByWithRelationInput;
  };

  export type InscripcionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: InscripcionWhereInput | InscripcionWhereInput[];
      OR?: InscripcionWhereInput[];
      NOT?: InscripcionWhereInput | InscripcionWhereInput[];
      usuarioId?: StringFilter<"Inscripcion"> | string;
      eventoId?: StringFilter<"Inscripcion"> | string;
      estado?:
        | EnumEstadoInscripcionFilter<"Inscripcion">
        | $Enums.EstadoInscripcion;
      fechaRegistro?: DateTimeFilter<"Inscripcion"> | Date | string;
      usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>;
      evento?: XOR<EventoScalarRelationFilter, EventoWhereInput>;
    },
    "id"
  >;

  export type InscripcionOrderByWithAggregationInput = {
    id?: SortOrder;
    usuarioId?: SortOrder;
    eventoId?: SortOrder;
    estado?: SortOrder;
    fechaRegistro?: SortOrder;
    _count?: InscripcionCountOrderByAggregateInput;
    _max?: InscripcionMaxOrderByAggregateInput;
    _min?: InscripcionMinOrderByAggregateInput;
  };

  export type InscripcionScalarWhereWithAggregatesInput = {
    AND?:
      | InscripcionScalarWhereWithAggregatesInput
      | InscripcionScalarWhereWithAggregatesInput[];
    OR?: InscripcionScalarWhereWithAggregatesInput[];
    NOT?:
      | InscripcionScalarWhereWithAggregatesInput
      | InscripcionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Inscripcion"> | string;
    usuarioId?: StringWithAggregatesFilter<"Inscripcion"> | string;
    eventoId?: StringWithAggregatesFilter<"Inscripcion"> | string;
    estado?:
      | EnumEstadoInscripcionWithAggregatesFilter<"Inscripcion">
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeWithAggregatesFilter<"Inscripcion"> | Date | string;
  };

  export type EventoCreateInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categoria: CategoriaCreateNestedOneWithoutEventosInput;
    organizador: UsuarioCreateNestedOneWithoutEventosInput;
    inscripciones?: InscripcionCreateNestedManyWithoutEventoInput;
  };

  export type EventoUncheckedCreateInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    categoriaId: string;
    organizadorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutEventoInput;
  };

  export type EventoUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    categoria?: CategoriaUpdateOneRequiredWithoutEventosNestedInput;
    organizador?: UsuarioUpdateOneRequiredWithoutEventosNestedInput;
    inscripciones?: InscripcionUpdateManyWithoutEventoNestedInput;
  };

  export type EventoUncheckedUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    categoriaId?: StringFieldUpdateOperationsInput | string;
    organizadorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inscripciones?: InscripcionUncheckedUpdateManyWithoutEventoNestedInput;
  };

  export type EventoCreateManyInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    categoriaId: string;
    organizadorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EventoUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EventoUncheckedUpdateManyInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    categoriaId?: StringFieldUpdateOperationsInput | string;
    organizadorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CategoriaCreateInput = {
    id?: string;
    nombre: string;
    eventos?: EventoCreateNestedManyWithoutCategoriaInput;
  };

  export type CategoriaUncheckedCreateInput = {
    id?: string;
    nombre: string;
    eventos?: EventoUncheckedCreateNestedManyWithoutCategoriaInput;
  };

  export type CategoriaUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
    eventos?: EventoUpdateManyWithoutCategoriaNestedInput;
  };

  export type CategoriaUncheckedUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
    eventos?: EventoUncheckedUpdateManyWithoutCategoriaNestedInput;
  };

  export type CategoriaCreateManyInput = {
    id?: string;
    nombre: string;
  };

  export type CategoriaUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
  };

  export type CategoriaUncheckedUpdateManyInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
  };

  export type UsuarioCreateInput = {
    id?: string;
    nombre: string;
    email: string;
    rol: $Enums.RolUsuario;
    eventos?: EventoCreateNestedManyWithoutOrganizadorInput;
    inscripciones?: InscripcionCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioUncheckedCreateInput = {
    id?: string;
    nombre: string;
    email: string;
    rol: $Enums.RolUsuario;
    eventos?: EventoUncheckedCreateNestedManyWithoutOrganizadorInput;
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario;
    eventos?: EventoUpdateManyWithoutOrganizadorNestedInput;
    inscripciones?: InscripcionUpdateManyWithoutUsuarioNestedInput;
  };

  export type UsuarioUncheckedUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario;
    eventos?: EventoUncheckedUpdateManyWithoutOrganizadorNestedInput;
    inscripciones?: InscripcionUncheckedUpdateManyWithoutUsuarioNestedInput;
  };

  export type UsuarioCreateManyInput = {
    id?: string;
    nombre: string;
    email: string;
    rol: $Enums.RolUsuario;
  };

  export type UsuarioUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario;
  };

  export type UsuarioUncheckedUpdateManyInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario;
  };

  export type InscripcionCreateInput = {
    id?: string;
    estado: $Enums.EstadoInscripcion;
    fechaRegistro?: Date | string;
    usuario: UsuarioCreateNestedOneWithoutInscripcionesInput;
    evento: EventoCreateNestedOneWithoutInscripcionesInput;
  };

  export type InscripcionUncheckedCreateInput = {
    id?: string;
    usuarioId: string;
    eventoId: string;
    estado: $Enums.EstadoInscripcion;
    fechaRegistro?: Date | string;
  };

  export type InscripcionUpdateInput = {
    estado?:
      | EnumEstadoInscripcionFieldUpdateOperationsInput
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: UsuarioUpdateOneRequiredWithoutInscripcionesNestedInput;
    evento?: EventoUpdateOneRequiredWithoutInscripcionesNestedInput;
  };

  export type InscripcionUncheckedUpdateInput = {
    usuarioId?: StringFieldUpdateOperationsInput | string;
    eventoId?: StringFieldUpdateOperationsInput | string;
    estado?:
      | EnumEstadoInscripcionFieldUpdateOperationsInput
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InscripcionCreateManyInput = {
    id?: string;
    usuarioId: string;
    eventoId: string;
    estado: $Enums.EstadoInscripcion;
    fechaRegistro?: Date | string;
  };

  export type InscripcionUpdateManyMutationInput = {
    estado?:
      | EnumEstadoInscripcionFieldUpdateOperationsInput
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InscripcionUncheckedUpdateManyInput = {
    usuarioId?: StringFieldUpdateOperationsInput | string;
    eventoId?: StringFieldUpdateOperationsInput | string;
    estado?:
      | EnumEstadoInscripcionFieldUpdateOperationsInput
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
    isSet?: boolean;
  };

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type EnumEstadoEventoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoEvento | EnumEstadoEventoFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.EstadoEvento[]
      | ListEnumEstadoEventoFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.EstadoEvento[]
      | ListEnumEstadoEventoFieldRefInput<$PrismaModel>;
    not?: NestedEnumEstadoEventoFilter<$PrismaModel> | $Enums.EstadoEvento;
  };

  export type CategoriaScalarRelationFilter = {
    is?: CategoriaWhereInput;
    isNot?: CategoriaWhereInput;
  };

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput;
    isNot?: UsuarioWhereInput;
  };

  export type InscripcionListRelationFilter = {
    every?: InscripcionWhereInput;
    some?: InscripcionWhereInput;
    none?: InscripcionWhereInput;
  };

  export type InscripcionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type EventoCountOrderByAggregateInput = {
    id?: SortOrder;
    titulo?: SortOrder;
    descripcion?: SortOrder;
    fechaInicio?: SortOrder;
    duracionHoras?: SortOrder;
    duracionMinutos?: SortOrder;
    ubicacion?: SortOrder;
    cupoMaximo?: SortOrder;
    cupoMinimo?: SortOrder;
    precio?: SortOrder;
    estado?: SortOrder;
    categoriaId?: SortOrder;
    organizadorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EventoAvgOrderByAggregateInput = {
    duracionHoras?: SortOrder;
    duracionMinutos?: SortOrder;
    cupoMaximo?: SortOrder;
    cupoMinimo?: SortOrder;
    precio?: SortOrder;
  };

  export type EventoMaxOrderByAggregateInput = {
    id?: SortOrder;
    titulo?: SortOrder;
    descripcion?: SortOrder;
    fechaInicio?: SortOrder;
    duracionHoras?: SortOrder;
    duracionMinutos?: SortOrder;
    ubicacion?: SortOrder;
    cupoMaximo?: SortOrder;
    cupoMinimo?: SortOrder;
    precio?: SortOrder;
    estado?: SortOrder;
    categoriaId?: SortOrder;
    organizadorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EventoMinOrderByAggregateInput = {
    id?: SortOrder;
    titulo?: SortOrder;
    descripcion?: SortOrder;
    fechaInicio?: SortOrder;
    duracionHoras?: SortOrder;
    duracionMinutos?: SortOrder;
    ubicacion?: SortOrder;
    cupoMaximo?: SortOrder;
    cupoMinimo?: SortOrder;
    precio?: SortOrder;
    estado?: SortOrder;
    categoriaId?: SortOrder;
    organizadorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EventoSumOrderByAggregateInput = {
    duracionHoras?: SortOrder;
    duracionMinutos?: SortOrder;
    cupoMaximo?: SortOrder;
    cupoMinimo?: SortOrder;
    precio?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
    isSet?: boolean;
  };

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type EnumEstadoEventoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoEvento | EnumEstadoEventoFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.EstadoEvento[]
      | ListEnumEstadoEventoFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.EstadoEvento[]
      | ListEnumEstadoEventoFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumEstadoEventoWithAggregatesFilter<$PrismaModel>
      | $Enums.EstadoEvento;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumEstadoEventoFilter<$PrismaModel>;
    _max?: NestedEnumEstadoEventoFilter<$PrismaModel>;
  };

  export type EventoListRelationFilter = {
    every?: EventoWhereInput;
    some?: EventoWhereInput;
    none?: EventoWhereInput;
  };

  export type EventoOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type CategoriaCountOrderByAggregateInput = {
    id?: SortOrder;
    nombre?: SortOrder;
  };

  export type CategoriaMaxOrderByAggregateInput = {
    id?: SortOrder;
    nombre?: SortOrder;
  };

  export type CategoriaMinOrderByAggregateInput = {
    id?: SortOrder;
    nombre?: SortOrder;
  };

  export type EnumRolUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.RolUsuario | EnumRolUsuarioFieldRefInput<$PrismaModel>;
    in?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>;
    not?: NestedEnumRolUsuarioFilter<$PrismaModel> | $Enums.RolUsuario;
  };

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder;
    nombre?: SortOrder;
    email?: SortOrder;
    rol?: SortOrder;
  };

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder;
    nombre?: SortOrder;
    email?: SortOrder;
    rol?: SortOrder;
  };

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder;
    nombre?: SortOrder;
    email?: SortOrder;
    rol?: SortOrder;
  };

  export type EnumRolUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RolUsuario | EnumRolUsuarioFieldRefInput<$PrismaModel>;
    in?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRolUsuarioWithAggregatesFilter<$PrismaModel>
      | $Enums.RolUsuario;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRolUsuarioFilter<$PrismaModel>;
    _max?: NestedEnumRolUsuarioFilter<$PrismaModel>;
  };

  export type EnumEstadoInscripcionFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.EstadoInscripcion
      | EnumEstadoInscripcionFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.EstadoInscripcion[]
      | ListEnumEstadoInscripcionFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.EstadoInscripcion[]
      | ListEnumEstadoInscripcionFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumEstadoInscripcionFilter<$PrismaModel>
      | $Enums.EstadoInscripcion;
  };

  export type EventoScalarRelationFilter = {
    is?: EventoWhereInput;
    isNot?: EventoWhereInput;
  };

  export type InscripcionCountOrderByAggregateInput = {
    id?: SortOrder;
    usuarioId?: SortOrder;
    eventoId?: SortOrder;
    estado?: SortOrder;
    fechaRegistro?: SortOrder;
  };

  export type InscripcionMaxOrderByAggregateInput = {
    id?: SortOrder;
    usuarioId?: SortOrder;
    eventoId?: SortOrder;
    estado?: SortOrder;
    fechaRegistro?: SortOrder;
  };

  export type InscripcionMinOrderByAggregateInput = {
    id?: SortOrder;
    usuarioId?: SortOrder;
    eventoId?: SortOrder;
    estado?: SortOrder;
    fechaRegistro?: SortOrder;
  };

  export type EnumEstadoInscripcionWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | $Enums.EstadoInscripcion
        | EnumEstadoInscripcionFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.EstadoInscripcion[]
        | ListEnumEstadoInscripcionFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.EstadoInscripcion[]
        | ListEnumEstadoInscripcionFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumEstadoInscripcionWithAggregatesFilter<$PrismaModel>
        | $Enums.EstadoInscripcion;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumEstadoInscripcionFilter<$PrismaModel>;
      _max?: NestedEnumEstadoInscripcionFilter<$PrismaModel>;
    };

  export type CategoriaCreateNestedOneWithoutEventosInput = {
    create?: XOR<
      CategoriaCreateWithoutEventosInput,
      CategoriaUncheckedCreateWithoutEventosInput
    >;
    connectOrCreate?: CategoriaCreateOrConnectWithoutEventosInput;
    connect?: CategoriaWhereUniqueInput;
  };

  export type UsuarioCreateNestedOneWithoutEventosInput = {
    create?: XOR<
      UsuarioCreateWithoutEventosInput,
      UsuarioUncheckedCreateWithoutEventosInput
    >;
    connectOrCreate?: UsuarioCreateOrConnectWithoutEventosInput;
    connect?: UsuarioWhereUniqueInput;
  };

  export type InscripcionCreateNestedManyWithoutEventoInput = {
    create?:
      | XOR<
          InscripcionCreateWithoutEventoInput,
          InscripcionUncheckedCreateWithoutEventoInput
        >
      | InscripcionCreateWithoutEventoInput[]
      | InscripcionUncheckedCreateWithoutEventoInput[];
    connectOrCreate?:
      | InscripcionCreateOrConnectWithoutEventoInput
      | InscripcionCreateOrConnectWithoutEventoInput[];
    createMany?: InscripcionCreateManyEventoInputEnvelope;
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
  };

  export type InscripcionUncheckedCreateNestedManyWithoutEventoInput = {
    create?:
      | XOR<
          InscripcionCreateWithoutEventoInput,
          InscripcionUncheckedCreateWithoutEventoInput
        >
      | InscripcionCreateWithoutEventoInput[]
      | InscripcionUncheckedCreateWithoutEventoInput[];
    connectOrCreate?:
      | InscripcionCreateOrConnectWithoutEventoInput
      | InscripcionCreateOrConnectWithoutEventoInput[];
    createMany?: InscripcionCreateManyEventoInputEnvelope;
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
    unset?: boolean;
  };

  export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type EnumEstadoEventoFieldUpdateOperationsInput = {
    set?: $Enums.EstadoEvento;
  };

  export type CategoriaUpdateOneRequiredWithoutEventosNestedInput = {
    create?: XOR<
      CategoriaCreateWithoutEventosInput,
      CategoriaUncheckedCreateWithoutEventosInput
    >;
    connectOrCreate?: CategoriaCreateOrConnectWithoutEventosInput;
    upsert?: CategoriaUpsertWithoutEventosInput;
    connect?: CategoriaWhereUniqueInput;
    update?: XOR<
      XOR<
        CategoriaUpdateToOneWithWhereWithoutEventosInput,
        CategoriaUpdateWithoutEventosInput
      >,
      CategoriaUncheckedUpdateWithoutEventosInput
    >;
  };

  export type UsuarioUpdateOneRequiredWithoutEventosNestedInput = {
    create?: XOR<
      UsuarioCreateWithoutEventosInput,
      UsuarioUncheckedCreateWithoutEventosInput
    >;
    connectOrCreate?: UsuarioCreateOrConnectWithoutEventosInput;
    upsert?: UsuarioUpsertWithoutEventosInput;
    connect?: UsuarioWhereUniqueInput;
    update?: XOR<
      XOR<
        UsuarioUpdateToOneWithWhereWithoutEventosInput,
        UsuarioUpdateWithoutEventosInput
      >,
      UsuarioUncheckedUpdateWithoutEventosInput
    >;
  };

  export type InscripcionUpdateManyWithoutEventoNestedInput = {
    create?:
      | XOR<
          InscripcionCreateWithoutEventoInput,
          InscripcionUncheckedCreateWithoutEventoInput
        >
      | InscripcionCreateWithoutEventoInput[]
      | InscripcionUncheckedCreateWithoutEventoInput[];
    connectOrCreate?:
      | InscripcionCreateOrConnectWithoutEventoInput
      | InscripcionCreateOrConnectWithoutEventoInput[];
    upsert?:
      | InscripcionUpsertWithWhereUniqueWithoutEventoInput
      | InscripcionUpsertWithWhereUniqueWithoutEventoInput[];
    createMany?: InscripcionCreateManyEventoInputEnvelope;
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    update?:
      | InscripcionUpdateWithWhereUniqueWithoutEventoInput
      | InscripcionUpdateWithWhereUniqueWithoutEventoInput[];
    updateMany?:
      | InscripcionUpdateManyWithWhereWithoutEventoInput
      | InscripcionUpdateManyWithWhereWithoutEventoInput[];
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[];
  };

  export type InscripcionUncheckedUpdateManyWithoutEventoNestedInput = {
    create?:
      | XOR<
          InscripcionCreateWithoutEventoInput,
          InscripcionUncheckedCreateWithoutEventoInput
        >
      | InscripcionCreateWithoutEventoInput[]
      | InscripcionUncheckedCreateWithoutEventoInput[];
    connectOrCreate?:
      | InscripcionCreateOrConnectWithoutEventoInput
      | InscripcionCreateOrConnectWithoutEventoInput[];
    upsert?:
      | InscripcionUpsertWithWhereUniqueWithoutEventoInput
      | InscripcionUpsertWithWhereUniqueWithoutEventoInput[];
    createMany?: InscripcionCreateManyEventoInputEnvelope;
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    update?:
      | InscripcionUpdateWithWhereUniqueWithoutEventoInput
      | InscripcionUpdateWithWhereUniqueWithoutEventoInput[];
    updateMany?:
      | InscripcionUpdateManyWithWhereWithoutEventoInput
      | InscripcionUpdateManyWithWhereWithoutEventoInput[];
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[];
  };

  export type EventoCreateNestedManyWithoutCategoriaInput = {
    create?:
      | XOR<
          EventoCreateWithoutCategoriaInput,
          EventoUncheckedCreateWithoutCategoriaInput
        >
      | EventoCreateWithoutCategoriaInput[]
      | EventoUncheckedCreateWithoutCategoriaInput[];
    connectOrCreate?:
      | EventoCreateOrConnectWithoutCategoriaInput
      | EventoCreateOrConnectWithoutCategoriaInput[];
    createMany?: EventoCreateManyCategoriaInputEnvelope;
    connect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
  };

  export type EventoUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?:
      | XOR<
          EventoCreateWithoutCategoriaInput,
          EventoUncheckedCreateWithoutCategoriaInput
        >
      | EventoCreateWithoutCategoriaInput[]
      | EventoUncheckedCreateWithoutCategoriaInput[];
    connectOrCreate?:
      | EventoCreateOrConnectWithoutCategoriaInput
      | EventoCreateOrConnectWithoutCategoriaInput[];
    createMany?: EventoCreateManyCategoriaInputEnvelope;
    connect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
  };

  export type EventoUpdateManyWithoutCategoriaNestedInput = {
    create?:
      | XOR<
          EventoCreateWithoutCategoriaInput,
          EventoUncheckedCreateWithoutCategoriaInput
        >
      | EventoCreateWithoutCategoriaInput[]
      | EventoUncheckedCreateWithoutCategoriaInput[];
    connectOrCreate?:
      | EventoCreateOrConnectWithoutCategoriaInput
      | EventoCreateOrConnectWithoutCategoriaInput[];
    upsert?:
      | EventoUpsertWithWhereUniqueWithoutCategoriaInput
      | EventoUpsertWithWhereUniqueWithoutCategoriaInput[];
    createMany?: EventoCreateManyCategoriaInputEnvelope;
    set?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    disconnect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    delete?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    connect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    update?:
      | EventoUpdateWithWhereUniqueWithoutCategoriaInput
      | EventoUpdateWithWhereUniqueWithoutCategoriaInput[];
    updateMany?:
      | EventoUpdateManyWithWhereWithoutCategoriaInput
      | EventoUpdateManyWithWhereWithoutCategoriaInput[];
    deleteMany?: EventoScalarWhereInput | EventoScalarWhereInput[];
  };

  export type EventoUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?:
      | XOR<
          EventoCreateWithoutCategoriaInput,
          EventoUncheckedCreateWithoutCategoriaInput
        >
      | EventoCreateWithoutCategoriaInput[]
      | EventoUncheckedCreateWithoutCategoriaInput[];
    connectOrCreate?:
      | EventoCreateOrConnectWithoutCategoriaInput
      | EventoCreateOrConnectWithoutCategoriaInput[];
    upsert?:
      | EventoUpsertWithWhereUniqueWithoutCategoriaInput
      | EventoUpsertWithWhereUniqueWithoutCategoriaInput[];
    createMany?: EventoCreateManyCategoriaInputEnvelope;
    set?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    disconnect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    delete?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    connect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    update?:
      | EventoUpdateWithWhereUniqueWithoutCategoriaInput
      | EventoUpdateWithWhereUniqueWithoutCategoriaInput[];
    updateMany?:
      | EventoUpdateManyWithWhereWithoutCategoriaInput
      | EventoUpdateManyWithWhereWithoutCategoriaInput[];
    deleteMany?: EventoScalarWhereInput | EventoScalarWhereInput[];
  };

  export type EventoCreateNestedManyWithoutOrganizadorInput = {
    create?:
      | XOR<
          EventoCreateWithoutOrganizadorInput,
          EventoUncheckedCreateWithoutOrganizadorInput
        >
      | EventoCreateWithoutOrganizadorInput[]
      | EventoUncheckedCreateWithoutOrganizadorInput[];
    connectOrCreate?:
      | EventoCreateOrConnectWithoutOrganizadorInput
      | EventoCreateOrConnectWithoutOrganizadorInput[];
    createMany?: EventoCreateManyOrganizadorInputEnvelope;
    connect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
  };

  export type InscripcionCreateNestedManyWithoutUsuarioInput = {
    create?:
      | XOR<
          InscripcionCreateWithoutUsuarioInput,
          InscripcionUncheckedCreateWithoutUsuarioInput
        >
      | InscripcionCreateWithoutUsuarioInput[]
      | InscripcionUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | InscripcionCreateOrConnectWithoutUsuarioInput
      | InscripcionCreateOrConnectWithoutUsuarioInput[];
    createMany?: InscripcionCreateManyUsuarioInputEnvelope;
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
  };

  export type EventoUncheckedCreateNestedManyWithoutOrganizadorInput = {
    create?:
      | XOR<
          EventoCreateWithoutOrganizadorInput,
          EventoUncheckedCreateWithoutOrganizadorInput
        >
      | EventoCreateWithoutOrganizadorInput[]
      | EventoUncheckedCreateWithoutOrganizadorInput[];
    connectOrCreate?:
      | EventoCreateOrConnectWithoutOrganizadorInput
      | EventoCreateOrConnectWithoutOrganizadorInput[];
    createMany?: EventoCreateManyOrganizadorInputEnvelope;
    connect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
  };

  export type InscripcionUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?:
      | XOR<
          InscripcionCreateWithoutUsuarioInput,
          InscripcionUncheckedCreateWithoutUsuarioInput
        >
      | InscripcionCreateWithoutUsuarioInput[]
      | InscripcionUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | InscripcionCreateOrConnectWithoutUsuarioInput
      | InscripcionCreateOrConnectWithoutUsuarioInput[];
    createMany?: InscripcionCreateManyUsuarioInputEnvelope;
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
  };

  export type EnumRolUsuarioFieldUpdateOperationsInput = {
    set?: $Enums.RolUsuario;
  };

  export type EventoUpdateManyWithoutOrganizadorNestedInput = {
    create?:
      | XOR<
          EventoCreateWithoutOrganizadorInput,
          EventoUncheckedCreateWithoutOrganizadorInput
        >
      | EventoCreateWithoutOrganizadorInput[]
      | EventoUncheckedCreateWithoutOrganizadorInput[];
    connectOrCreate?:
      | EventoCreateOrConnectWithoutOrganizadorInput
      | EventoCreateOrConnectWithoutOrganizadorInput[];
    upsert?:
      | EventoUpsertWithWhereUniqueWithoutOrganizadorInput
      | EventoUpsertWithWhereUniqueWithoutOrganizadorInput[];
    createMany?: EventoCreateManyOrganizadorInputEnvelope;
    set?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    disconnect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    delete?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    connect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    update?:
      | EventoUpdateWithWhereUniqueWithoutOrganizadorInput
      | EventoUpdateWithWhereUniqueWithoutOrganizadorInput[];
    updateMany?:
      | EventoUpdateManyWithWhereWithoutOrganizadorInput
      | EventoUpdateManyWithWhereWithoutOrganizadorInput[];
    deleteMany?: EventoScalarWhereInput | EventoScalarWhereInput[];
  };

  export type InscripcionUpdateManyWithoutUsuarioNestedInput = {
    create?:
      | XOR<
          InscripcionCreateWithoutUsuarioInput,
          InscripcionUncheckedCreateWithoutUsuarioInput
        >
      | InscripcionCreateWithoutUsuarioInput[]
      | InscripcionUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | InscripcionCreateOrConnectWithoutUsuarioInput
      | InscripcionCreateOrConnectWithoutUsuarioInput[];
    upsert?:
      | InscripcionUpsertWithWhereUniqueWithoutUsuarioInput
      | InscripcionUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: InscripcionCreateManyUsuarioInputEnvelope;
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    update?:
      | InscripcionUpdateWithWhereUniqueWithoutUsuarioInput
      | InscripcionUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?:
      | InscripcionUpdateManyWithWhereWithoutUsuarioInput
      | InscripcionUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[];
  };

  export type EventoUncheckedUpdateManyWithoutOrganizadorNestedInput = {
    create?:
      | XOR<
          EventoCreateWithoutOrganizadorInput,
          EventoUncheckedCreateWithoutOrganizadorInput
        >
      | EventoCreateWithoutOrganizadorInput[]
      | EventoUncheckedCreateWithoutOrganizadorInput[];
    connectOrCreate?:
      | EventoCreateOrConnectWithoutOrganizadorInput
      | EventoCreateOrConnectWithoutOrganizadorInput[];
    upsert?:
      | EventoUpsertWithWhereUniqueWithoutOrganizadorInput
      | EventoUpsertWithWhereUniqueWithoutOrganizadorInput[];
    createMany?: EventoCreateManyOrganizadorInputEnvelope;
    set?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    disconnect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    delete?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    connect?: EventoWhereUniqueInput | EventoWhereUniqueInput[];
    update?:
      | EventoUpdateWithWhereUniqueWithoutOrganizadorInput
      | EventoUpdateWithWhereUniqueWithoutOrganizadorInput[];
    updateMany?:
      | EventoUpdateManyWithWhereWithoutOrganizadorInput
      | EventoUpdateManyWithWhereWithoutOrganizadorInput[];
    deleteMany?: EventoScalarWhereInput | EventoScalarWhereInput[];
  };

  export type InscripcionUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?:
      | XOR<
          InscripcionCreateWithoutUsuarioInput,
          InscripcionUncheckedCreateWithoutUsuarioInput
        >
      | InscripcionCreateWithoutUsuarioInput[]
      | InscripcionUncheckedCreateWithoutUsuarioInput[];
    connectOrCreate?:
      | InscripcionCreateOrConnectWithoutUsuarioInput
      | InscripcionCreateOrConnectWithoutUsuarioInput[];
    upsert?:
      | InscripcionUpsertWithWhereUniqueWithoutUsuarioInput
      | InscripcionUpsertWithWhereUniqueWithoutUsuarioInput[];
    createMany?: InscripcionCreateManyUsuarioInputEnvelope;
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[];
    update?:
      | InscripcionUpdateWithWhereUniqueWithoutUsuarioInput
      | InscripcionUpdateWithWhereUniqueWithoutUsuarioInput[];
    updateMany?:
      | InscripcionUpdateManyWithWhereWithoutUsuarioInput
      | InscripcionUpdateManyWithWhereWithoutUsuarioInput[];
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[];
  };

  export type UsuarioCreateNestedOneWithoutInscripcionesInput = {
    create?: XOR<
      UsuarioCreateWithoutInscripcionesInput,
      UsuarioUncheckedCreateWithoutInscripcionesInput
    >;
    connectOrCreate?: UsuarioCreateOrConnectWithoutInscripcionesInput;
    connect?: UsuarioWhereUniqueInput;
  };

  export type EventoCreateNestedOneWithoutInscripcionesInput = {
    create?: XOR<
      EventoCreateWithoutInscripcionesInput,
      EventoUncheckedCreateWithoutInscripcionesInput
    >;
    connectOrCreate?: EventoCreateOrConnectWithoutInscripcionesInput;
    connect?: EventoWhereUniqueInput;
  };

  export type EnumEstadoInscripcionFieldUpdateOperationsInput = {
    set?: $Enums.EstadoInscripcion;
  };

  export type UsuarioUpdateOneRequiredWithoutInscripcionesNestedInput = {
    create?: XOR<
      UsuarioCreateWithoutInscripcionesInput,
      UsuarioUncheckedCreateWithoutInscripcionesInput
    >;
    connectOrCreate?: UsuarioCreateOrConnectWithoutInscripcionesInput;
    upsert?: UsuarioUpsertWithoutInscripcionesInput;
    connect?: UsuarioWhereUniqueInput;
    update?: XOR<
      XOR<
        UsuarioUpdateToOneWithWhereWithoutInscripcionesInput,
        UsuarioUpdateWithoutInscripcionesInput
      >,
      UsuarioUncheckedUpdateWithoutInscripcionesInput
    >;
  };

  export type EventoUpdateOneRequiredWithoutInscripcionesNestedInput = {
    create?: XOR<
      EventoCreateWithoutInscripcionesInput,
      EventoUncheckedCreateWithoutInscripcionesInput
    >;
    connectOrCreate?: EventoCreateOrConnectWithoutInscripcionesInput;
    upsert?: EventoUpsertWithoutInscripcionesInput;
    connect?: EventoWhereUniqueInput;
    update?: XOR<
      XOR<
        EventoUpdateToOneWithWhereWithoutInscripcionesInput,
        EventoUpdateWithoutInscripcionesInput
      >,
      EventoUncheckedUpdateWithoutInscripcionesInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
    isSet?: boolean;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedEnumEstadoEventoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoEvento | EnumEstadoEventoFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.EstadoEvento[]
      | ListEnumEstadoEventoFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.EstadoEvento[]
      | ListEnumEstadoEventoFieldRefInput<$PrismaModel>;
    not?: NestedEnumEstadoEventoFilter<$PrismaModel> | $Enums.EstadoEvento;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
    isSet?: boolean;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
    isSet?: boolean;
  };

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type NestedEnumEstadoEventoWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | $Enums.EstadoEvento
        | EnumEstadoEventoFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.EstadoEvento[]
        | ListEnumEstadoEventoFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.EstadoEvento[]
        | ListEnumEstadoEventoFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumEstadoEventoWithAggregatesFilter<$PrismaModel>
        | $Enums.EstadoEvento;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumEstadoEventoFilter<$PrismaModel>;
      _max?: NestedEnumEstadoEventoFilter<$PrismaModel>;
    };

  export type NestedEnumRolUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.RolUsuario | EnumRolUsuarioFieldRefInput<$PrismaModel>;
    in?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>;
    not?: NestedEnumRolUsuarioFilter<$PrismaModel> | $Enums.RolUsuario;
  };

  export type NestedEnumRolUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RolUsuario | EnumRolUsuarioFieldRefInput<$PrismaModel>;
    in?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RolUsuario[] | ListEnumRolUsuarioFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRolUsuarioWithAggregatesFilter<$PrismaModel>
      | $Enums.RolUsuario;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRolUsuarioFilter<$PrismaModel>;
    _max?: NestedEnumRolUsuarioFilter<$PrismaModel>;
  };

  export type NestedEnumEstadoInscripcionFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.EstadoInscripcion
      | EnumEstadoInscripcionFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.EstadoInscripcion[]
      | ListEnumEstadoInscripcionFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.EstadoInscripcion[]
      | ListEnumEstadoInscripcionFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumEstadoInscripcionFilter<$PrismaModel>
      | $Enums.EstadoInscripcion;
  };

  export type NestedEnumEstadoInscripcionWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.EstadoInscripcion
      | EnumEstadoInscripcionFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.EstadoInscripcion[]
      | ListEnumEstadoInscripcionFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.EstadoInscripcion[]
      | ListEnumEstadoInscripcionFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumEstadoInscripcionWithAggregatesFilter<$PrismaModel>
      | $Enums.EstadoInscripcion;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumEstadoInscripcionFilter<$PrismaModel>;
    _max?: NestedEnumEstadoInscripcionFilter<$PrismaModel>;
  };

  export type CategoriaCreateWithoutEventosInput = {
    id?: string;
    nombre: string;
  };

  export type CategoriaUncheckedCreateWithoutEventosInput = {
    id?: string;
    nombre: string;
  };

  export type CategoriaCreateOrConnectWithoutEventosInput = {
    where: CategoriaWhereUniqueInput;
    create: XOR<
      CategoriaCreateWithoutEventosInput,
      CategoriaUncheckedCreateWithoutEventosInput
    >;
  };

  export type UsuarioCreateWithoutEventosInput = {
    id?: string;
    nombre: string;
    email: string;
    rol: $Enums.RolUsuario;
    inscripciones?: InscripcionCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioUncheckedCreateWithoutEventosInput = {
    id?: string;
    nombre: string;
    email: string;
    rol: $Enums.RolUsuario;
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutUsuarioInput;
  };

  export type UsuarioCreateOrConnectWithoutEventosInput = {
    where: UsuarioWhereUniqueInput;
    create: XOR<
      UsuarioCreateWithoutEventosInput,
      UsuarioUncheckedCreateWithoutEventosInput
    >;
  };

  export type InscripcionCreateWithoutEventoInput = {
    id?: string;
    estado: $Enums.EstadoInscripcion;
    fechaRegistro?: Date | string;
    usuario: UsuarioCreateNestedOneWithoutInscripcionesInput;
  };

  export type InscripcionUncheckedCreateWithoutEventoInput = {
    id?: string;
    usuarioId: string;
    estado: $Enums.EstadoInscripcion;
    fechaRegistro?: Date | string;
  };

  export type InscripcionCreateOrConnectWithoutEventoInput = {
    where: InscripcionWhereUniqueInput;
    create: XOR<
      InscripcionCreateWithoutEventoInput,
      InscripcionUncheckedCreateWithoutEventoInput
    >;
  };

  export type InscripcionCreateManyEventoInputEnvelope = {
    data: InscripcionCreateManyEventoInput | InscripcionCreateManyEventoInput[];
  };

  export type CategoriaUpsertWithoutEventosInput = {
    update: XOR<
      CategoriaUpdateWithoutEventosInput,
      CategoriaUncheckedUpdateWithoutEventosInput
    >;
    create: XOR<
      CategoriaCreateWithoutEventosInput,
      CategoriaUncheckedCreateWithoutEventosInput
    >;
    where?: CategoriaWhereInput;
  };

  export type CategoriaUpdateToOneWithWhereWithoutEventosInput = {
    where?: CategoriaWhereInput;
    data: XOR<
      CategoriaUpdateWithoutEventosInput,
      CategoriaUncheckedUpdateWithoutEventosInput
    >;
  };

  export type CategoriaUpdateWithoutEventosInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
  };

  export type CategoriaUncheckedUpdateWithoutEventosInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
  };

  export type UsuarioUpsertWithoutEventosInput = {
    update: XOR<
      UsuarioUpdateWithoutEventosInput,
      UsuarioUncheckedUpdateWithoutEventosInput
    >;
    create: XOR<
      UsuarioCreateWithoutEventosInput,
      UsuarioUncheckedCreateWithoutEventosInput
    >;
    where?: UsuarioWhereInput;
  };

  export type UsuarioUpdateToOneWithWhereWithoutEventosInput = {
    where?: UsuarioWhereInput;
    data: XOR<
      UsuarioUpdateWithoutEventosInput,
      UsuarioUncheckedUpdateWithoutEventosInput
    >;
  };

  export type UsuarioUpdateWithoutEventosInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario;
    inscripciones?: InscripcionUpdateManyWithoutUsuarioNestedInput;
  };

  export type UsuarioUncheckedUpdateWithoutEventosInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario;
    inscripciones?: InscripcionUncheckedUpdateManyWithoutUsuarioNestedInput;
  };

  export type InscripcionUpsertWithWhereUniqueWithoutEventoInput = {
    where: InscripcionWhereUniqueInput;
    update: XOR<
      InscripcionUpdateWithoutEventoInput,
      InscripcionUncheckedUpdateWithoutEventoInput
    >;
    create: XOR<
      InscripcionCreateWithoutEventoInput,
      InscripcionUncheckedCreateWithoutEventoInput
    >;
  };

  export type InscripcionUpdateWithWhereUniqueWithoutEventoInput = {
    where: InscripcionWhereUniqueInput;
    data: XOR<
      InscripcionUpdateWithoutEventoInput,
      InscripcionUncheckedUpdateWithoutEventoInput
    >;
  };

  export type InscripcionUpdateManyWithWhereWithoutEventoInput = {
    where: InscripcionScalarWhereInput;
    data: XOR<
      InscripcionUpdateManyMutationInput,
      InscripcionUncheckedUpdateManyWithoutEventoInput
    >;
  };

  export type InscripcionScalarWhereInput = {
    AND?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[];
    OR?: InscripcionScalarWhereInput[];
    NOT?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[];
    id?: StringFilter<"Inscripcion"> | string;
    usuarioId?: StringFilter<"Inscripcion"> | string;
    eventoId?: StringFilter<"Inscripcion"> | string;
    estado?:
      | EnumEstadoInscripcionFilter<"Inscripcion">
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFilter<"Inscripcion"> | Date | string;
  };

  export type EventoCreateWithoutCategoriaInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    organizador: UsuarioCreateNestedOneWithoutEventosInput;
    inscripciones?: InscripcionCreateNestedManyWithoutEventoInput;
  };

  export type EventoUncheckedCreateWithoutCategoriaInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    organizadorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutEventoInput;
  };

  export type EventoCreateOrConnectWithoutCategoriaInput = {
    where: EventoWhereUniqueInput;
    create: XOR<
      EventoCreateWithoutCategoriaInput,
      EventoUncheckedCreateWithoutCategoriaInput
    >;
  };

  export type EventoCreateManyCategoriaInputEnvelope = {
    data: EventoCreateManyCategoriaInput | EventoCreateManyCategoriaInput[];
  };

  export type EventoUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: EventoWhereUniqueInput;
    update: XOR<
      EventoUpdateWithoutCategoriaInput,
      EventoUncheckedUpdateWithoutCategoriaInput
    >;
    create: XOR<
      EventoCreateWithoutCategoriaInput,
      EventoUncheckedCreateWithoutCategoriaInput
    >;
  };

  export type EventoUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: EventoWhereUniqueInput;
    data: XOR<
      EventoUpdateWithoutCategoriaInput,
      EventoUncheckedUpdateWithoutCategoriaInput
    >;
  };

  export type EventoUpdateManyWithWhereWithoutCategoriaInput = {
    where: EventoScalarWhereInput;
    data: XOR<
      EventoUpdateManyMutationInput,
      EventoUncheckedUpdateManyWithoutCategoriaInput
    >;
  };

  export type EventoScalarWhereInput = {
    AND?: EventoScalarWhereInput | EventoScalarWhereInput[];
    OR?: EventoScalarWhereInput[];
    NOT?: EventoScalarWhereInput | EventoScalarWhereInput[];
    id?: StringFilter<"Evento"> | string;
    titulo?: StringFilter<"Evento"> | string;
    descripcion?: StringFilter<"Evento"> | string;
    fechaInicio?: DateTimeFilter<"Evento"> | Date | string;
    duracionHoras?: IntFilter<"Evento"> | number;
    duracionMinutos?: IntFilter<"Evento"> | number;
    ubicacion?: StringFilter<"Evento"> | string;
    cupoMaximo?: IntFilter<"Evento"> | number;
    cupoMinimo?: IntNullableFilter<"Evento"> | number | null;
    precio?: FloatFilter<"Evento"> | number;
    estado?: EnumEstadoEventoFilter<"Evento"> | $Enums.EstadoEvento;
    categoriaId?: StringFilter<"Evento"> | string;
    organizadorId?: StringFilter<"Evento"> | string;
    createdAt?: DateTimeFilter<"Evento"> | Date | string;
    updatedAt?: DateTimeFilter<"Evento"> | Date | string;
  };

  export type EventoCreateWithoutOrganizadorInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categoria: CategoriaCreateNestedOneWithoutEventosInput;
    inscripciones?: InscripcionCreateNestedManyWithoutEventoInput;
  };

  export type EventoUncheckedCreateWithoutOrganizadorInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    categoriaId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutEventoInput;
  };

  export type EventoCreateOrConnectWithoutOrganizadorInput = {
    where: EventoWhereUniqueInput;
    create: XOR<
      EventoCreateWithoutOrganizadorInput,
      EventoUncheckedCreateWithoutOrganizadorInput
    >;
  };

  export type EventoCreateManyOrganizadorInputEnvelope = {
    data: EventoCreateManyOrganizadorInput | EventoCreateManyOrganizadorInput[];
  };

  export type InscripcionCreateWithoutUsuarioInput = {
    id?: string;
    estado: $Enums.EstadoInscripcion;
    fechaRegistro?: Date | string;
    evento: EventoCreateNestedOneWithoutInscripcionesInput;
  };

  export type InscripcionUncheckedCreateWithoutUsuarioInput = {
    id?: string;
    eventoId: string;
    estado: $Enums.EstadoInscripcion;
    fechaRegistro?: Date | string;
  };

  export type InscripcionCreateOrConnectWithoutUsuarioInput = {
    where: InscripcionWhereUniqueInput;
    create: XOR<
      InscripcionCreateWithoutUsuarioInput,
      InscripcionUncheckedCreateWithoutUsuarioInput
    >;
  };

  export type InscripcionCreateManyUsuarioInputEnvelope = {
    data:
      | InscripcionCreateManyUsuarioInput
      | InscripcionCreateManyUsuarioInput[];
  };

  export type EventoUpsertWithWhereUniqueWithoutOrganizadorInput = {
    where: EventoWhereUniqueInput;
    update: XOR<
      EventoUpdateWithoutOrganizadorInput,
      EventoUncheckedUpdateWithoutOrganizadorInput
    >;
    create: XOR<
      EventoCreateWithoutOrganizadorInput,
      EventoUncheckedCreateWithoutOrganizadorInput
    >;
  };

  export type EventoUpdateWithWhereUniqueWithoutOrganizadorInput = {
    where: EventoWhereUniqueInput;
    data: XOR<
      EventoUpdateWithoutOrganizadorInput,
      EventoUncheckedUpdateWithoutOrganizadorInput
    >;
  };

  export type EventoUpdateManyWithWhereWithoutOrganizadorInput = {
    where: EventoScalarWhereInput;
    data: XOR<
      EventoUpdateManyMutationInput,
      EventoUncheckedUpdateManyWithoutOrganizadorInput
    >;
  };

  export type InscripcionUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: InscripcionWhereUniqueInput;
    update: XOR<
      InscripcionUpdateWithoutUsuarioInput,
      InscripcionUncheckedUpdateWithoutUsuarioInput
    >;
    create: XOR<
      InscripcionCreateWithoutUsuarioInput,
      InscripcionUncheckedCreateWithoutUsuarioInput
    >;
  };

  export type InscripcionUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: InscripcionWhereUniqueInput;
    data: XOR<
      InscripcionUpdateWithoutUsuarioInput,
      InscripcionUncheckedUpdateWithoutUsuarioInput
    >;
  };

  export type InscripcionUpdateManyWithWhereWithoutUsuarioInput = {
    where: InscripcionScalarWhereInput;
    data: XOR<
      InscripcionUpdateManyMutationInput,
      InscripcionUncheckedUpdateManyWithoutUsuarioInput
    >;
  };

  export type UsuarioCreateWithoutInscripcionesInput = {
    id?: string;
    nombre: string;
    email: string;
    rol: $Enums.RolUsuario;
    eventos?: EventoCreateNestedManyWithoutOrganizadorInput;
  };

  export type UsuarioUncheckedCreateWithoutInscripcionesInput = {
    id?: string;
    nombre: string;
    email: string;
    rol: $Enums.RolUsuario;
    eventos?: EventoUncheckedCreateNestedManyWithoutOrganizadorInput;
  };

  export type UsuarioCreateOrConnectWithoutInscripcionesInput = {
    where: UsuarioWhereUniqueInput;
    create: XOR<
      UsuarioCreateWithoutInscripcionesInput,
      UsuarioUncheckedCreateWithoutInscripcionesInput
    >;
  };

  export type EventoCreateWithoutInscripcionesInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categoria: CategoriaCreateNestedOneWithoutEventosInput;
    organizador: UsuarioCreateNestedOneWithoutEventosInput;
  };

  export type EventoUncheckedCreateWithoutInscripcionesInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    categoriaId: string;
    organizadorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EventoCreateOrConnectWithoutInscripcionesInput = {
    where: EventoWhereUniqueInput;
    create: XOR<
      EventoCreateWithoutInscripcionesInput,
      EventoUncheckedCreateWithoutInscripcionesInput
    >;
  };

  export type UsuarioUpsertWithoutInscripcionesInput = {
    update: XOR<
      UsuarioUpdateWithoutInscripcionesInput,
      UsuarioUncheckedUpdateWithoutInscripcionesInput
    >;
    create: XOR<
      UsuarioCreateWithoutInscripcionesInput,
      UsuarioUncheckedCreateWithoutInscripcionesInput
    >;
    where?: UsuarioWhereInput;
  };

  export type UsuarioUpdateToOneWithWhereWithoutInscripcionesInput = {
    where?: UsuarioWhereInput;
    data: XOR<
      UsuarioUpdateWithoutInscripcionesInput,
      UsuarioUncheckedUpdateWithoutInscripcionesInput
    >;
  };

  export type UsuarioUpdateWithoutInscripcionesInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario;
    eventos?: EventoUpdateManyWithoutOrganizadorNestedInput;
  };

  export type UsuarioUncheckedUpdateWithoutInscripcionesInput = {
    nombre?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    rol?: EnumRolUsuarioFieldUpdateOperationsInput | $Enums.RolUsuario;
    eventos?: EventoUncheckedUpdateManyWithoutOrganizadorNestedInput;
  };

  export type EventoUpsertWithoutInscripcionesInput = {
    update: XOR<
      EventoUpdateWithoutInscripcionesInput,
      EventoUncheckedUpdateWithoutInscripcionesInput
    >;
    create: XOR<
      EventoCreateWithoutInscripcionesInput,
      EventoUncheckedCreateWithoutInscripcionesInput
    >;
    where?: EventoWhereInput;
  };

  export type EventoUpdateToOneWithWhereWithoutInscripcionesInput = {
    where?: EventoWhereInput;
    data: XOR<
      EventoUpdateWithoutInscripcionesInput,
      EventoUncheckedUpdateWithoutInscripcionesInput
    >;
  };

  export type EventoUpdateWithoutInscripcionesInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    categoria?: CategoriaUpdateOneRequiredWithoutEventosNestedInput;
    organizador?: UsuarioUpdateOneRequiredWithoutEventosNestedInput;
  };

  export type EventoUncheckedUpdateWithoutInscripcionesInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    categoriaId?: StringFieldUpdateOperationsInput | string;
    organizadorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InscripcionCreateManyEventoInput = {
    id?: string;
    usuarioId: string;
    estado: $Enums.EstadoInscripcion;
    fechaRegistro?: Date | string;
  };

  export type InscripcionUpdateWithoutEventoInput = {
    estado?:
      | EnumEstadoInscripcionFieldUpdateOperationsInput
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFieldUpdateOperationsInput | Date | string;
    usuario?: UsuarioUpdateOneRequiredWithoutInscripcionesNestedInput;
  };

  export type InscripcionUncheckedUpdateWithoutEventoInput = {
    usuarioId?: StringFieldUpdateOperationsInput | string;
    estado?:
      | EnumEstadoInscripcionFieldUpdateOperationsInput
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InscripcionUncheckedUpdateManyWithoutEventoInput = {
    usuarioId?: StringFieldUpdateOperationsInput | string;
    estado?:
      | EnumEstadoInscripcionFieldUpdateOperationsInput
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EventoCreateManyCategoriaInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    organizadorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EventoUpdateWithoutCategoriaInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    organizador?: UsuarioUpdateOneRequiredWithoutEventosNestedInput;
    inscripciones?: InscripcionUpdateManyWithoutEventoNestedInput;
  };

  export type EventoUncheckedUpdateWithoutCategoriaInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    organizadorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inscripciones?: InscripcionUncheckedUpdateManyWithoutEventoNestedInput;
  };

  export type EventoUncheckedUpdateManyWithoutCategoriaInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    organizadorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EventoCreateManyOrganizadorInput = {
    id?: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date | string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo?: number | null;
    precio: number;
    estado: $Enums.EstadoEvento;
    categoriaId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type InscripcionCreateManyUsuarioInput = {
    id?: string;
    eventoId: string;
    estado: $Enums.EstadoInscripcion;
    fechaRegistro?: Date | string;
  };

  export type EventoUpdateWithoutOrganizadorInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    categoria?: CategoriaUpdateOneRequiredWithoutEventosNestedInput;
    inscripciones?: InscripcionUpdateManyWithoutEventoNestedInput;
  };

  export type EventoUncheckedUpdateWithoutOrganizadorInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    categoriaId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inscripciones?: InscripcionUncheckedUpdateManyWithoutEventoNestedInput;
  };

  export type EventoUncheckedUpdateManyWithoutOrganizadorInput = {
    titulo?: StringFieldUpdateOperationsInput | string;
    descripcion?: StringFieldUpdateOperationsInput | string;
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string;
    duracionHoras?: IntFieldUpdateOperationsInput | number;
    duracionMinutos?: IntFieldUpdateOperationsInput | number;
    ubicacion?: StringFieldUpdateOperationsInput | string;
    cupoMaximo?: IntFieldUpdateOperationsInput | number;
    cupoMinimo?: NullableIntFieldUpdateOperationsInput | number | null;
    precio?: FloatFieldUpdateOperationsInput | number;
    estado?: EnumEstadoEventoFieldUpdateOperationsInput | $Enums.EstadoEvento;
    categoriaId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InscripcionUpdateWithoutUsuarioInput = {
    estado?:
      | EnumEstadoInscripcionFieldUpdateOperationsInput
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFieldUpdateOperationsInput | Date | string;
    evento?: EventoUpdateOneRequiredWithoutInscripcionesNestedInput;
  };

  export type InscripcionUncheckedUpdateWithoutUsuarioInput = {
    eventoId?: StringFieldUpdateOperationsInput | string;
    estado?:
      | EnumEstadoInscripcionFieldUpdateOperationsInput
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type InscripcionUncheckedUpdateManyWithoutUsuarioInput = {
    eventoId?: StringFieldUpdateOperationsInput | string;
    estado?:
      | EnumEstadoInscripcionFieldUpdateOperationsInput
      | $Enums.EstadoInscripcion;
    fechaRegistro?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
