
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Doctor
 * 
 */
export type Doctor = $Result.DefaultSelection<Prisma.$DoctorPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model TriageRecord
 * 
 */
export type TriageRecord = $Result.DefaultSelection<Prisma.$TriageRecordPayload>
/**
 * Model Bill
 * 
 */
export type Bill = $Result.DefaultSelection<Prisma.$BillPayload>
/**
 * Model Prescription
 * 
 */
export type Prescription = $Result.DefaultSelection<Prisma.$PrescriptionPayload>
/**
 * Model LabReport
 * 
 */
export type LabReport = $Result.DefaultSelection<Prisma.$LabReportPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model BedCapacity
 * 
 */
export type BedCapacity = $Result.DefaultSelection<Prisma.$BedCapacityPayload>
/**
 * Model ContactMessage
 * 
 */
export type ContactMessage = $Result.DefaultSelection<Prisma.$ContactMessagePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.doctor`: Exposes CRUD operations for the **Doctor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Doctors
    * const doctors = await prisma.doctor.findMany()
    * ```
    */
  get doctor(): Prisma.DoctorDelegate<ExtArgs>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs>;

  /**
   * `prisma.triageRecord`: Exposes CRUD operations for the **TriageRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TriageRecords
    * const triageRecords = await prisma.triageRecord.findMany()
    * ```
    */
  get triageRecord(): Prisma.TriageRecordDelegate<ExtArgs>;

  /**
   * `prisma.bill`: Exposes CRUD operations for the **Bill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bills
    * const bills = await prisma.bill.findMany()
    * ```
    */
  get bill(): Prisma.BillDelegate<ExtArgs>;

  /**
   * `prisma.prescription`: Exposes CRUD operations for the **Prescription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prescriptions
    * const prescriptions = await prisma.prescription.findMany()
    * ```
    */
  get prescription(): Prisma.PrescriptionDelegate<ExtArgs>;

  /**
   * `prisma.labReport`: Exposes CRUD operations for the **LabReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LabReports
    * const labReports = await prisma.labReport.findMany()
    * ```
    */
  get labReport(): Prisma.LabReportDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.bedCapacity`: Exposes CRUD operations for the **BedCapacity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BedCapacities
    * const bedCapacities = await prisma.bedCapacity.findMany()
    * ```
    */
  get bedCapacity(): Prisma.BedCapacityDelegate<ExtArgs>;

  /**
   * `prisma.contactMessage`: Exposes CRUD operations for the **ContactMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactMessages
    * const contactMessages = await prisma.contactMessage.findMany()
    * ```
    */
  get contactMessage(): Prisma.ContactMessageDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Doctor: 'Doctor',
    Patient: 'Patient',
    Appointment: 'Appointment',
    TriageRecord: 'TriageRecord',
    Bill: 'Bill',
    Prescription: 'Prescription',
    LabReport: 'LabReport',
    AuditLog: 'AuditLog',
    BedCapacity: 'BedCapacity',
    ContactMessage: 'ContactMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "doctor" | "patient" | "appointment" | "triageRecord" | "bill" | "prescription" | "labReport" | "auditLog" | "bedCapacity" | "contactMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Doctor: {
        payload: Prisma.$DoctorPayload<ExtArgs>
        fields: Prisma.DoctorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findFirst: {
            args: Prisma.DoctorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findMany: {
            args: Prisma.DoctorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          create: {
            args: Prisma.DoctorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          createMany: {
            args: Prisma.DoctorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          delete: {
            args: Prisma.DoctorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          update: {
            args: Prisma.DoctorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          deleteMany: {
            args: Prisma.DoctorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DoctorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          aggregate: {
            args: Prisma.DoctorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctor>
          }
          groupBy: {
            args: Prisma.DoctorGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      TriageRecord: {
        payload: Prisma.$TriageRecordPayload<ExtArgs>
        fields: Prisma.TriageRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TriageRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriageRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TriageRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriageRecordPayload>
          }
          findFirst: {
            args: Prisma.TriageRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriageRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TriageRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriageRecordPayload>
          }
          findMany: {
            args: Prisma.TriageRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriageRecordPayload>[]
          }
          create: {
            args: Prisma.TriageRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriageRecordPayload>
          }
          createMany: {
            args: Prisma.TriageRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TriageRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriageRecordPayload>[]
          }
          delete: {
            args: Prisma.TriageRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriageRecordPayload>
          }
          update: {
            args: Prisma.TriageRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriageRecordPayload>
          }
          deleteMany: {
            args: Prisma.TriageRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TriageRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TriageRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriageRecordPayload>
          }
          aggregate: {
            args: Prisma.TriageRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTriageRecord>
          }
          groupBy: {
            args: Prisma.TriageRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<TriageRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.TriageRecordCountArgs<ExtArgs>
            result: $Utils.Optional<TriageRecordCountAggregateOutputType> | number
          }
        }
      }
      Bill: {
        payload: Prisma.$BillPayload<ExtArgs>
        fields: Prisma.BillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          findFirst: {
            args: Prisma.BillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          findMany: {
            args: Prisma.BillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>[]
          }
          create: {
            args: Prisma.BillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          createMany: {
            args: Prisma.BillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>[]
          }
          delete: {
            args: Prisma.BillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          update: {
            args: Prisma.BillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          deleteMany: {
            args: Prisma.BillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          aggregate: {
            args: Prisma.BillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBill>
          }
          groupBy: {
            args: Prisma.BillGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillCountArgs<ExtArgs>
            result: $Utils.Optional<BillCountAggregateOutputType> | number
          }
        }
      }
      Prescription: {
        payload: Prisma.$PrescriptionPayload<ExtArgs>
        fields: Prisma.PrescriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrescriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrescriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findFirst: {
            args: Prisma.PrescriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrescriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findMany: {
            args: Prisma.PrescriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          create: {
            args: Prisma.PrescriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          createMany: {
            args: Prisma.PrescriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrescriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          delete: {
            args: Prisma.PrescriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          update: {
            args: Prisma.PrescriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          deleteMany: {
            args: Prisma.PrescriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrescriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PrescriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          aggregate: {
            args: Prisma.PrescriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrescription>
          }
          groupBy: {
            args: Prisma.PrescriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrescriptionCountArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionCountAggregateOutputType> | number
          }
        }
      }
      LabReport: {
        payload: Prisma.$LabReportPayload<ExtArgs>
        fields: Prisma.LabReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LabReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LabReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabReportPayload>
          }
          findFirst: {
            args: Prisma.LabReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LabReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabReportPayload>
          }
          findMany: {
            args: Prisma.LabReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabReportPayload>[]
          }
          create: {
            args: Prisma.LabReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabReportPayload>
          }
          createMany: {
            args: Prisma.LabReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LabReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabReportPayload>[]
          }
          delete: {
            args: Prisma.LabReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabReportPayload>
          }
          update: {
            args: Prisma.LabReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabReportPayload>
          }
          deleteMany: {
            args: Prisma.LabReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LabReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LabReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabReportPayload>
          }
          aggregate: {
            args: Prisma.LabReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLabReport>
          }
          groupBy: {
            args: Prisma.LabReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<LabReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.LabReportCountArgs<ExtArgs>
            result: $Utils.Optional<LabReportCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      BedCapacity: {
        payload: Prisma.$BedCapacityPayload<ExtArgs>
        fields: Prisma.BedCapacityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BedCapacityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedCapacityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BedCapacityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedCapacityPayload>
          }
          findFirst: {
            args: Prisma.BedCapacityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedCapacityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BedCapacityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedCapacityPayload>
          }
          findMany: {
            args: Prisma.BedCapacityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedCapacityPayload>[]
          }
          create: {
            args: Prisma.BedCapacityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedCapacityPayload>
          }
          createMany: {
            args: Prisma.BedCapacityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BedCapacityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedCapacityPayload>[]
          }
          delete: {
            args: Prisma.BedCapacityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedCapacityPayload>
          }
          update: {
            args: Prisma.BedCapacityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedCapacityPayload>
          }
          deleteMany: {
            args: Prisma.BedCapacityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BedCapacityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BedCapacityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedCapacityPayload>
          }
          aggregate: {
            args: Prisma.BedCapacityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBedCapacity>
          }
          groupBy: {
            args: Prisma.BedCapacityGroupByArgs<ExtArgs>
            result: $Utils.Optional<BedCapacityGroupByOutputType>[]
          }
          count: {
            args: Prisma.BedCapacityCountArgs<ExtArgs>
            result: $Utils.Optional<BedCapacityCountAggregateOutputType> | number
          }
        }
      }
      ContactMessage: {
        payload: Prisma.$ContactMessagePayload<ExtArgs>
        fields: Prisma.ContactMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findFirst: {
            args: Prisma.ContactMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findMany: {
            args: Prisma.ContactMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>[]
          }
          create: {
            args: Prisma.ContactMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          createMany: {
            args: Prisma.ContactMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>[]
          }
          delete: {
            args: Prisma.ContactMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          update: {
            args: Prisma.ContactMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          deleteMany: {
            args: Prisma.ContactMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          aggregate: {
            args: Prisma.ContactMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactMessage>
          }
          groupBy: {
            args: Prisma.ContactMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    offboardedUsers: number
    cancelledAppointments: number
    receptionistTriage: number
    doctorReferredTriage: number
    createdBills: number
    uploadedLabReports: number
    performedAuditLogs: number
    targetAuditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offboardedUsers?: boolean | UserCountOutputTypeCountOffboardedUsersArgs
    cancelledAppointments?: boolean | UserCountOutputTypeCountCancelledAppointmentsArgs
    receptionistTriage?: boolean | UserCountOutputTypeCountReceptionistTriageArgs
    doctorReferredTriage?: boolean | UserCountOutputTypeCountDoctorReferredTriageArgs
    createdBills?: boolean | UserCountOutputTypeCountCreatedBillsArgs
    uploadedLabReports?: boolean | UserCountOutputTypeCountUploadedLabReportsArgs
    performedAuditLogs?: boolean | UserCountOutputTypeCountPerformedAuditLogsArgs
    targetAuditLogs?: boolean | UserCountOutputTypeCountTargetAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOffboardedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCancelledAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceptionistTriageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TriageRecordWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDoctorReferredTriageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TriageRecordWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadedLabReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPerformedAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTargetAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type DoctorCountOutputType
   */

  export type DoctorCountOutputType = {
    appointments: number
    prescriptions: number
    labReports: number
  }

  export type DoctorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | DoctorCountOutputTypeCountAppointmentsArgs
    prescriptions?: boolean | DoctorCountOutputTypeCountPrescriptionsArgs
    labReports?: boolean | DoctorCountOutputTypeCountLabReportsArgs
  }

  // Custom InputTypes
  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorCountOutputType
     */
    select?: DoctorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountPrescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountLabReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabReportWhereInput
  }


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    appointments: number
    triageRecords: number
    bills: number
    prescriptions: number
    labReports: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | PatientCountOutputTypeCountAppointmentsArgs
    triageRecords?: boolean | PatientCountOutputTypeCountTriageRecordsArgs
    bills?: boolean | PatientCountOutputTypeCountBillsArgs
    prescriptions?: boolean | PatientCountOutputTypeCountPrescriptionsArgs
    labReports?: boolean | PatientCountOutputTypeCountLabReportsArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountTriageRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TriageRecordWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountPrescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountLabReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabReportWhereInput
  }


  /**
   * Count Type AppointmentCountOutputType
   */

  export type AppointmentCountOutputType = {
    bills: number
  }

  export type AppointmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bills?: boolean | AppointmentCountOutputTypeCountBillsArgs
  }

  // Custom InputTypes
  /**
   * AppointmentCountOutputType without action
   */
  export type AppointmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppointmentCountOutputType
     */
    select?: AppointmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppointmentCountOutputType without action
   */
  export type AppointmentCountOutputTypeCountBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: string | null
    isActive: boolean | null
    isOffboarded: boolean | null
    offboardedAt: Date | null
    offboardedById: string | null
    lastLogin: Date | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: string | null
    isActive: boolean | null
    isOffboarded: boolean | null
    offboardedAt: Date | null
    offboardedById: string | null
    lastLogin: Date | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    profile: number
    isActive: number
    isOffboarded: number
    offboardedAt: number
    offboardedById: number
    lastLogin: number
    refreshToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    isOffboarded?: true
    offboardedAt?: true
    offboardedById?: true
    lastLogin?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    isOffboarded?: true
    offboardedAt?: true
    offboardedById?: true
    lastLogin?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    profile?: true
    isActive?: true
    isOffboarded?: true
    offboardedAt?: true
    offboardedById?: true
    lastLogin?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: string
    profile: JsonValue
    isActive: boolean
    isOffboarded: boolean
    offboardedAt: Date | null
    offboardedById: string | null
    lastLogin: Date | null
    refreshToken: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    profile?: boolean
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: boolean
    offboardedById?: boolean
    lastLogin?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    offboardedBy?: boolean | User$offboardedByArgs<ExtArgs>
    offboardedUsers?: boolean | User$offboardedUsersArgs<ExtArgs>
    doctor?: boolean | User$doctorArgs<ExtArgs>
    patient?: boolean | User$patientArgs<ExtArgs>
    cancelledAppointments?: boolean | User$cancelledAppointmentsArgs<ExtArgs>
    receptionistTriage?: boolean | User$receptionistTriageArgs<ExtArgs>
    doctorReferredTriage?: boolean | User$doctorReferredTriageArgs<ExtArgs>
    createdBills?: boolean | User$createdBillsArgs<ExtArgs>
    uploadedLabReports?: boolean | User$uploadedLabReportsArgs<ExtArgs>
    performedAuditLogs?: boolean | User$performedAuditLogsArgs<ExtArgs>
    targetAuditLogs?: boolean | User$targetAuditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    profile?: boolean
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: boolean
    offboardedById?: boolean
    lastLogin?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    offboardedBy?: boolean | User$offboardedByArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    profile?: boolean
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: boolean
    offboardedById?: boolean
    lastLogin?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offboardedBy?: boolean | User$offboardedByArgs<ExtArgs>
    offboardedUsers?: boolean | User$offboardedUsersArgs<ExtArgs>
    doctor?: boolean | User$doctorArgs<ExtArgs>
    patient?: boolean | User$patientArgs<ExtArgs>
    cancelledAppointments?: boolean | User$cancelledAppointmentsArgs<ExtArgs>
    receptionistTriage?: boolean | User$receptionistTriageArgs<ExtArgs>
    doctorReferredTriage?: boolean | User$doctorReferredTriageArgs<ExtArgs>
    createdBills?: boolean | User$createdBillsArgs<ExtArgs>
    uploadedLabReports?: boolean | User$uploadedLabReportsArgs<ExtArgs>
    performedAuditLogs?: boolean | User$performedAuditLogsArgs<ExtArgs>
    targetAuditLogs?: boolean | User$targetAuditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offboardedBy?: boolean | User$offboardedByArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      offboardedBy: Prisma.$UserPayload<ExtArgs> | null
      offboardedUsers: Prisma.$UserPayload<ExtArgs>[]
      doctor: Prisma.$DoctorPayload<ExtArgs> | null
      patient: Prisma.$PatientPayload<ExtArgs> | null
      cancelledAppointments: Prisma.$AppointmentPayload<ExtArgs>[]
      receptionistTriage: Prisma.$TriageRecordPayload<ExtArgs>[]
      doctorReferredTriage: Prisma.$TriageRecordPayload<ExtArgs>[]
      createdBills: Prisma.$BillPayload<ExtArgs>[]
      uploadedLabReports: Prisma.$LabReportPayload<ExtArgs>[]
      performedAuditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      targetAuditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: string
      profile: Prisma.JsonValue
      isActive: boolean
      isOffboarded: boolean
      offboardedAt: Date | null
      offboardedById: string | null
      lastLogin: Date | null
      refreshToken: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    offboardedBy<T extends User$offboardedByArgs<ExtArgs> = {}>(args?: Subset<T, User$offboardedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    offboardedUsers<T extends User$offboardedUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$offboardedUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    doctor<T extends User$doctorArgs<ExtArgs> = {}>(args?: Subset<T, User$doctorArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    patient<T extends User$patientArgs<ExtArgs> = {}>(args?: Subset<T, User$patientArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    cancelledAppointments<T extends User$cancelledAppointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$cancelledAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany"> | Null>
    receptionistTriage<T extends User$receptionistTriageArgs<ExtArgs> = {}>(args?: Subset<T, User$receptionistTriageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "findMany"> | Null>
    doctorReferredTriage<T extends User$doctorReferredTriageArgs<ExtArgs> = {}>(args?: Subset<T, User$doctorReferredTriageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "findMany"> | Null>
    createdBills<T extends User$createdBillsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdBillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany"> | Null>
    uploadedLabReports<T extends User$uploadedLabReportsArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadedLabReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "findMany"> | Null>
    performedAuditLogs<T extends User$performedAuditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$performedAuditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    targetAuditLogs<T extends User$targetAuditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$targetAuditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly profile: FieldRef<"User", 'Json'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isOffboarded: FieldRef<"User", 'Boolean'>
    readonly offboardedAt: FieldRef<"User", 'DateTime'>
    readonly offboardedById: FieldRef<"User", 'String'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly refreshToken: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.offboardedBy
   */
  export type User$offboardedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.offboardedUsers
   */
  export type User$offboardedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.doctor
   */
  export type User$doctorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    where?: DoctorWhereInput
  }

  /**
   * User.patient
   */
  export type User$patientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
  }

  /**
   * User.cancelledAppointments
   */
  export type User$cancelledAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User.receptionistTriage
   */
  export type User$receptionistTriageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    where?: TriageRecordWhereInput
    orderBy?: TriageRecordOrderByWithRelationInput | TriageRecordOrderByWithRelationInput[]
    cursor?: TriageRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TriageRecordScalarFieldEnum | TriageRecordScalarFieldEnum[]
  }

  /**
   * User.doctorReferredTriage
   */
  export type User$doctorReferredTriageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    where?: TriageRecordWhereInput
    orderBy?: TriageRecordOrderByWithRelationInput | TriageRecordOrderByWithRelationInput[]
    cursor?: TriageRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TriageRecordScalarFieldEnum | TriageRecordScalarFieldEnum[]
  }

  /**
   * User.createdBills
   */
  export type User$createdBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    where?: BillWhereInput
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    cursor?: BillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * User.uploadedLabReports
   */
  export type User$uploadedLabReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    where?: LabReportWhereInput
    orderBy?: LabReportOrderByWithRelationInput | LabReportOrderByWithRelationInput[]
    cursor?: LabReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LabReportScalarFieldEnum | LabReportScalarFieldEnum[]
  }

  /**
   * User.performedAuditLogs
   */
  export type User$performedAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User.targetAuditLogs
   */
  export type User$targetAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Doctor
   */

  export type AggregateDoctor = {
    _count: DoctorCountAggregateOutputType | null
    _avg: DoctorAvgAggregateOutputType | null
    _sum: DoctorSumAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  export type DoctorAvgAggregateOutputType = {
    experience: number | null
    consultationFee: number | null
  }

  export type DoctorSumAggregateOutputType = {
    experience: number | null
    consultationFee: number | null
  }

  export type DoctorMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    specialization: string | null
    qualifications: string | null
    experience: number | null
    licenseNumber: string | null
    consultationFee: number | null
    isAvailable: boolean | null
    dutyStatus: string | null
    department: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    specialization: string | null
    qualifications: string | null
    experience: number | null
    licenseNumber: string | null
    consultationFee: number | null
    isAvailable: boolean | null
    dutyStatus: string | null
    department: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    specialization: number
    qualifications: number
    experience: number
    licenseNumber: number
    consultationFee: number
    availability: number
    isAvailable: number
    dutyStatus: number
    rating: number
    department: number
    leaves: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DoctorAvgAggregateInputType = {
    experience?: true
    consultationFee?: true
  }

  export type DoctorSumAggregateInputType = {
    experience?: true
    consultationFee?: true
  }

  export type DoctorMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    specialization?: true
    qualifications?: true
    experience?: true
    licenseNumber?: true
    consultationFee?: true
    isAvailable?: true
    dutyStatus?: true
    department?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    specialization?: true
    qualifications?: true
    experience?: true
    licenseNumber?: true
    consultationFee?: true
    isAvailable?: true
    dutyStatus?: true
    department?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    specialization?: true
    qualifications?: true
    experience?: true
    licenseNumber?: true
    consultationFee?: true
    availability?: true
    isAvailable?: true
    dutyStatus?: true
    rating?: true
    department?: true
    leaves?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DoctorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctor to aggregate.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Doctors
    **/
    _count?: true | DoctorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorMaxAggregateInputType
  }

  export type GetDoctorAggregateType<T extends DoctorAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctor[P]>
      : GetScalarType<T[P], AggregateDoctor[P]>
  }




  export type DoctorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorWhereInput
    orderBy?: DoctorOrderByWithAggregationInput | DoctorOrderByWithAggregationInput[]
    by: DoctorScalarFieldEnum[] | DoctorScalarFieldEnum
    having?: DoctorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorCountAggregateInputType | true
    _avg?: DoctorAvgAggregateInputType
    _sum?: DoctorSumAggregateInputType
    _min?: DoctorMinAggregateInputType
    _max?: DoctorMaxAggregateInputType
  }

  export type DoctorGroupByOutputType = {
    id: string
    userId: string
    name: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonValue
    isAvailable: boolean
    dutyStatus: string
    rating: JsonValue
    department: string
    leaves: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: DoctorCountAggregateOutputType | null
    _avg: DoctorAvgAggregateOutputType | null
    _sum: DoctorSumAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  type GetDoctorGroupByPayload<T extends DoctorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorGroupByOutputType[P]>
        }
      >
    >


  export type DoctorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    specialization?: boolean
    qualifications?: boolean
    experience?: boolean
    licenseNumber?: boolean
    consultationFee?: boolean
    availability?: boolean
    isAvailable?: boolean
    dutyStatus?: boolean
    rating?: boolean
    department?: boolean
    leaves?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointments?: boolean | Doctor$appointmentsArgs<ExtArgs>
    prescriptions?: boolean | Doctor$prescriptionsArgs<ExtArgs>
    labReports?: boolean | Doctor$labReportsArgs<ExtArgs>
    _count?: boolean | DoctorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    specialization?: boolean
    qualifications?: boolean
    experience?: boolean
    licenseNumber?: boolean
    consultationFee?: boolean
    availability?: boolean
    isAvailable?: boolean
    dutyStatus?: boolean
    rating?: boolean
    department?: boolean
    leaves?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    specialization?: boolean
    qualifications?: boolean
    experience?: boolean
    licenseNumber?: boolean
    consultationFee?: boolean
    availability?: boolean
    isAvailable?: boolean
    dutyStatus?: boolean
    rating?: boolean
    department?: boolean
    leaves?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DoctorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointments?: boolean | Doctor$appointmentsArgs<ExtArgs>
    prescriptions?: boolean | Doctor$prescriptionsArgs<ExtArgs>
    labReports?: boolean | Doctor$labReportsArgs<ExtArgs>
    _count?: boolean | DoctorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DoctorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DoctorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Doctor"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      prescriptions: Prisma.$PrescriptionPayload<ExtArgs>[]
      labReports: Prisma.$LabReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      specialization: string
      qualifications: string
      experience: number
      licenseNumber: string
      consultationFee: number
      availability: Prisma.JsonValue
      isAvailable: boolean
      dutyStatus: string
      rating: Prisma.JsonValue
      department: string
      leaves: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["doctor"]>
    composites: {}
  }

  type DoctorGetPayload<S extends boolean | null | undefined | DoctorDefaultArgs> = $Result.GetResult<Prisma.$DoctorPayload, S>

  type DoctorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DoctorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DoctorCountAggregateInputType | true
    }

  export interface DoctorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Doctor'], meta: { name: 'Doctor' } }
    /**
     * Find zero or one Doctor that matches the filter.
     * @param {DoctorFindUniqueArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorFindUniqueArgs>(args: SelectSubset<T, DoctorFindUniqueArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Doctor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DoctorFindUniqueOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Doctor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorFindFirstArgs>(args?: SelectSubset<T, DoctorFindFirstArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Doctor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Doctors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doctors
     * const doctors = await prisma.doctor.findMany()
     * 
     * // Get first 10 Doctors
     * const doctors = await prisma.doctor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorWithIdOnly = await prisma.doctor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorFindManyArgs>(args?: SelectSubset<T, DoctorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Doctor.
     * @param {DoctorCreateArgs} args - Arguments to create a Doctor.
     * @example
     * // Create one Doctor
     * const Doctor = await prisma.doctor.create({
     *   data: {
     *     // ... data to create a Doctor
     *   }
     * })
     * 
     */
    create<T extends DoctorCreateArgs>(args: SelectSubset<T, DoctorCreateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Doctors.
     * @param {DoctorCreateManyArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorCreateManyArgs>(args?: SelectSubset<T, DoctorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Doctors and returns the data saved in the database.
     * @param {DoctorCreateManyAndReturnArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Doctor.
     * @param {DoctorDeleteArgs} args - Arguments to delete one Doctor.
     * @example
     * // Delete one Doctor
     * const Doctor = await prisma.doctor.delete({
     *   where: {
     *     // ... filter to delete one Doctor
     *   }
     * })
     * 
     */
    delete<T extends DoctorDeleteArgs>(args: SelectSubset<T, DoctorDeleteArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Doctor.
     * @param {DoctorUpdateArgs} args - Arguments to update one Doctor.
     * @example
     * // Update one Doctor
     * const doctor = await prisma.doctor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorUpdateArgs>(args: SelectSubset<T, DoctorUpdateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Doctors.
     * @param {DoctorDeleteManyArgs} args - Arguments to filter Doctors to delete.
     * @example
     * // Delete a few Doctors
     * const { count } = await prisma.doctor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorDeleteManyArgs>(args?: SelectSubset<T, DoctorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorUpdateManyArgs>(args: SelectSubset<T, DoctorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Doctor.
     * @param {DoctorUpsertArgs} args - Arguments to update or create a Doctor.
     * @example
     * // Update or create a Doctor
     * const doctor = await prisma.doctor.upsert({
     *   create: {
     *     // ... data to create a Doctor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doctor we want to update
     *   }
     * })
     */
    upsert<T extends DoctorUpsertArgs>(args: SelectSubset<T, DoctorUpsertArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorCountArgs} args - Arguments to filter Doctors to count.
     * @example
     * // Count the number of Doctors
     * const count = await prisma.doctor.count({
     *   where: {
     *     // ... the filter for the Doctors we want to count
     *   }
     * })
    **/
    count<T extends DoctorCountArgs>(
      args?: Subset<T, DoctorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DoctorAggregateArgs>(args: Subset<T, DoctorAggregateArgs>): Prisma.PrismaPromise<GetDoctorAggregateType<T>>

    /**
     * Group by Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorGroupByArgs} args - Group by arguments.
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
      T extends DoctorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorGroupByArgs['orderBy'] }
        : { orderBy?: DoctorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Doctor model
   */
  readonly fields: DoctorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Doctor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    appointments<T extends Doctor$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany"> | Null>
    prescriptions<T extends Doctor$prescriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$prescriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany"> | Null>
    labReports<T extends Doctor$labReportsArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$labReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Doctor model
   */ 
  interface DoctorFieldRefs {
    readonly id: FieldRef<"Doctor", 'String'>
    readonly userId: FieldRef<"Doctor", 'String'>
    readonly name: FieldRef<"Doctor", 'String'>
    readonly specialization: FieldRef<"Doctor", 'String'>
    readonly qualifications: FieldRef<"Doctor", 'String'>
    readonly experience: FieldRef<"Doctor", 'Int'>
    readonly licenseNumber: FieldRef<"Doctor", 'String'>
    readonly consultationFee: FieldRef<"Doctor", 'Float'>
    readonly availability: FieldRef<"Doctor", 'Json'>
    readonly isAvailable: FieldRef<"Doctor", 'Boolean'>
    readonly dutyStatus: FieldRef<"Doctor", 'String'>
    readonly rating: FieldRef<"Doctor", 'Json'>
    readonly department: FieldRef<"Doctor", 'String'>
    readonly leaves: FieldRef<"Doctor", 'Json'>
    readonly createdAt: FieldRef<"Doctor", 'DateTime'>
    readonly updatedAt: FieldRef<"Doctor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Doctor findUnique
   */
  export type DoctorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findUniqueOrThrow
   */
  export type DoctorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findFirst
   */
  export type DoctorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findFirstOrThrow
   */
  export type DoctorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findMany
   */
  export type DoctorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctors to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor create
   */
  export type DoctorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to create a Doctor.
     */
    data: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
  }

  /**
   * Doctor createMany
   */
  export type DoctorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Doctor createManyAndReturn
   */
  export type DoctorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctor update
   */
  export type DoctorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to update a Doctor.
     */
    data: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
    /**
     * Choose, which Doctor to update.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor updateMany
   */
  export type DoctorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
  }

  /**
   * Doctor upsert
   */
  export type DoctorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The filter to search for the Doctor to update in case it exists.
     */
    where: DoctorWhereUniqueInput
    /**
     * In case the Doctor found by the `where` argument doesn't exist, create a new Doctor with this data.
     */
    create: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
    /**
     * In case the Doctor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
  }

  /**
   * Doctor delete
   */
  export type DoctorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter which Doctor to delete.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor deleteMany
   */
  export type DoctorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctors to delete
     */
    where?: DoctorWhereInput
  }

  /**
   * Doctor.appointments
   */
  export type Doctor$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Doctor.prescriptions
   */
  export type Doctor$prescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    cursor?: PrescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Doctor.labReports
   */
  export type Doctor$labReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    where?: LabReportWhereInput
    orderBy?: LabReportOrderByWithRelationInput | LabReportOrderByWithRelationInput[]
    cursor?: LabReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LabReportScalarFieldEnum | LabReportScalarFieldEnum[]
  }

  /**
   * Doctor without action
   */
  export type DoctorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    userId: string | null
    medicalRecordNumber: string | null
    bloodGroup: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    medicalRecordNumber: string | null
    bloodGroup: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    userId: number
    medicalRecordNumber: number
    medicalHistory: number
    allergies: number
    medications: number
    emergencyContact: number
    bloodGroup: number
    insuranceInfo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatientMinAggregateInputType = {
    id?: true
    userId?: true
    medicalRecordNumber?: true
    bloodGroup?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    userId?: true
    medicalRecordNumber?: true
    bloodGroup?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    userId?: true
    medicalRecordNumber?: true
    medicalHistory?: true
    allergies?: true
    medications?: true
    emergencyContact?: true
    bloodGroup?: true
    insuranceInfo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    userId: string
    medicalRecordNumber: string
    medicalHistory: JsonValue
    allergies: JsonValue
    medications: JsonValue
    emergencyContact: JsonValue
    bloodGroup: string | null
    insuranceInfo: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    medicalRecordNumber?: boolean
    medicalHistory?: boolean
    allergies?: boolean
    medications?: boolean
    emergencyContact?: boolean
    bloodGroup?: boolean
    insuranceInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointments?: boolean | Patient$appointmentsArgs<ExtArgs>
    triageRecords?: boolean | Patient$triageRecordsArgs<ExtArgs>
    bills?: boolean | Patient$billsArgs<ExtArgs>
    prescriptions?: boolean | Patient$prescriptionsArgs<ExtArgs>
    labReports?: boolean | Patient$labReportsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    medicalRecordNumber?: boolean
    medicalHistory?: boolean
    allergies?: boolean
    medications?: boolean
    emergencyContact?: boolean
    bloodGroup?: boolean
    insuranceInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    userId?: boolean
    medicalRecordNumber?: boolean
    medicalHistory?: boolean
    allergies?: boolean
    medications?: boolean
    emergencyContact?: boolean
    bloodGroup?: boolean
    insuranceInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointments?: boolean | Patient$appointmentsArgs<ExtArgs>
    triageRecords?: boolean | Patient$triageRecordsArgs<ExtArgs>
    bills?: boolean | Patient$billsArgs<ExtArgs>
    prescriptions?: boolean | Patient$prescriptionsArgs<ExtArgs>
    labReports?: boolean | Patient$labReportsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      triageRecords: Prisma.$TriageRecordPayload<ExtArgs>[]
      bills: Prisma.$BillPayload<ExtArgs>[]
      prescriptions: Prisma.$PrescriptionPayload<ExtArgs>[]
      labReports: Prisma.$LabReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      medicalRecordNumber: string
      medicalHistory: Prisma.JsonValue
      allergies: Prisma.JsonValue
      medications: Prisma.JsonValue
      emergencyContact: Prisma.JsonValue
      bloodGroup: string | null
      insuranceInfo: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
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
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    appointments<T extends Patient$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany"> | Null>
    triageRecords<T extends Patient$triageRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$triageRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "findMany"> | Null>
    bills<T extends Patient$billsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$billsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany"> | Null>
    prescriptions<T extends Patient$prescriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$prescriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany"> | Null>
    labReports<T extends Patient$labReportsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$labReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */ 
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly userId: FieldRef<"Patient", 'String'>
    readonly medicalRecordNumber: FieldRef<"Patient", 'String'>
    readonly medicalHistory: FieldRef<"Patient", 'Json'>
    readonly allergies: FieldRef<"Patient", 'Json'>
    readonly medications: FieldRef<"Patient", 'Json'>
    readonly emergencyContact: FieldRef<"Patient", 'Json'>
    readonly bloodGroup: FieldRef<"Patient", 'String'>
    readonly insuranceInfo: FieldRef<"Patient", 'Json'>
    readonly createdAt: FieldRef<"Patient", 'DateTime'>
    readonly updatedAt: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
  }

  /**
   * Patient.appointments
   */
  export type Patient$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Patient.triageRecords
   */
  export type Patient$triageRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    where?: TriageRecordWhereInput
    orderBy?: TriageRecordOrderByWithRelationInput | TriageRecordOrderByWithRelationInput[]
    cursor?: TriageRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TriageRecordScalarFieldEnum | TriageRecordScalarFieldEnum[]
  }

  /**
   * Patient.bills
   */
  export type Patient$billsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    where?: BillWhereInput
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    cursor?: BillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Patient.prescriptions
   */
  export type Patient$prescriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    cursor?: PrescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Patient.labReports
   */
  export type Patient$labReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    where?: LabReportWhereInput
    orderBy?: LabReportOrderByWithRelationInput | LabReportOrderByWithRelationInput[]
    cursor?: LabReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LabReportScalarFieldEnum | LabReportScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    doctorId: string | null
    date: Date | null
    status: string | null
    paymentMode: string | null
    paymentStatus: string | null
    consultationType: string | null
    symptoms: string | null
    notes: string | null
    prescriptionId: string | null
    cancellationReason: string | null
    cancelledById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    doctorId: string | null
    date: Date | null
    status: string | null
    paymentMode: string | null
    paymentStatus: string | null
    consultationType: string | null
    symptoms: string | null
    notes: string | null
    prescriptionId: string | null
    cancellationReason: string | null
    cancelledById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    patientId: number
    doctorId: number
    date: number
    timeSlot: number
    status: number
    paymentMode: number
    paymentStatus: number
    paymentDetails: number
    consultationType: number
    symptoms: number
    notes: number
    patientDocuments: number
    prescriptionId: number
    cancellationReason: number
    cancelledById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentMinAggregateInputType = {
    id?: true
    patientId?: true
    doctorId?: true
    date?: true
    status?: true
    paymentMode?: true
    paymentStatus?: true
    consultationType?: true
    symptoms?: true
    notes?: true
    prescriptionId?: true
    cancellationReason?: true
    cancelledById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    patientId?: true
    doctorId?: true
    date?: true
    status?: true
    paymentMode?: true
    paymentStatus?: true
    consultationType?: true
    symptoms?: true
    notes?: true
    prescriptionId?: true
    cancellationReason?: true
    cancelledById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    patientId?: true
    doctorId?: true
    date?: true
    timeSlot?: true
    status?: true
    paymentMode?: true
    paymentStatus?: true
    paymentDetails?: true
    consultationType?: true
    symptoms?: true
    notes?: true
    patientDocuments?: true
    prescriptionId?: true
    cancellationReason?: true
    cancelledById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    patientId: string
    doctorId: string
    date: Date
    timeSlot: JsonValue
    status: string
    paymentMode: string
    paymentStatus: string
    paymentDetails: JsonValue | null
    consultationType: string
    symptoms: string | null
    notes: string | null
    patientDocuments: JsonValue | null
    prescriptionId: string | null
    cancellationReason: string | null
    cancelledById: string | null
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    doctorId?: boolean
    date?: boolean
    timeSlot?: boolean
    status?: boolean
    paymentMode?: boolean
    paymentStatus?: boolean
    paymentDetails?: boolean
    consultationType?: boolean
    symptoms?: boolean
    notes?: boolean
    patientDocuments?: boolean
    prescriptionId?: boolean
    cancellationReason?: boolean
    cancelledById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    prescription?: boolean | Appointment$prescriptionArgs<ExtArgs>
    cancelledBy?: boolean | Appointment$cancelledByArgs<ExtArgs>
    bills?: boolean | Appointment$billsArgs<ExtArgs>
    _count?: boolean | AppointmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    doctorId?: boolean
    date?: boolean
    timeSlot?: boolean
    status?: boolean
    paymentMode?: boolean
    paymentStatus?: boolean
    paymentDetails?: boolean
    consultationType?: boolean
    symptoms?: boolean
    notes?: boolean
    patientDocuments?: boolean
    prescriptionId?: boolean
    cancellationReason?: boolean
    cancelledById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    prescription?: boolean | Appointment$prescriptionArgs<ExtArgs>
    cancelledBy?: boolean | Appointment$cancelledByArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    patientId?: boolean
    doctorId?: boolean
    date?: boolean
    timeSlot?: boolean
    status?: boolean
    paymentMode?: boolean
    paymentStatus?: boolean
    paymentDetails?: boolean
    consultationType?: boolean
    symptoms?: boolean
    notes?: boolean
    patientDocuments?: boolean
    prescriptionId?: boolean
    cancellationReason?: boolean
    cancelledById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    prescription?: boolean | Appointment$prescriptionArgs<ExtArgs>
    cancelledBy?: boolean | Appointment$cancelledByArgs<ExtArgs>
    bills?: boolean | Appointment$billsArgs<ExtArgs>
    _count?: boolean | AppointmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    prescription?: boolean | Appointment$prescriptionArgs<ExtArgs>
    cancelledBy?: boolean | Appointment$cancelledByArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      doctor: Prisma.$DoctorPayload<ExtArgs>
      prescription: Prisma.$PrescriptionPayload<ExtArgs> | null
      cancelledBy: Prisma.$UserPayload<ExtArgs> | null
      bills: Prisma.$BillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      doctorId: string
      date: Date
      timeSlot: Prisma.JsonValue
      status: string
      paymentMode: string
      paymentStatus: string
      paymentDetails: Prisma.JsonValue | null
      consultationType: string
      symptoms: string | null
      notes: string | null
      patientDocuments: Prisma.JsonValue | null
      prescriptionId: string | null
      cancellationReason: string | null
      cancelledById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
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
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    prescription<T extends Appointment$prescriptionArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$prescriptionArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    cancelledBy<T extends Appointment$cancelledByArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$cancelledByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    bills<T extends Appointment$billsArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$billsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */ 
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly patientId: FieldRef<"Appointment", 'String'>
    readonly doctorId: FieldRef<"Appointment", 'String'>
    readonly date: FieldRef<"Appointment", 'DateTime'>
    readonly timeSlot: FieldRef<"Appointment", 'Json'>
    readonly status: FieldRef<"Appointment", 'String'>
    readonly paymentMode: FieldRef<"Appointment", 'String'>
    readonly paymentStatus: FieldRef<"Appointment", 'String'>
    readonly paymentDetails: FieldRef<"Appointment", 'Json'>
    readonly consultationType: FieldRef<"Appointment", 'String'>
    readonly symptoms: FieldRef<"Appointment", 'String'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly patientDocuments: FieldRef<"Appointment", 'Json'>
    readonly prescriptionId: FieldRef<"Appointment", 'String'>
    readonly cancellationReason: FieldRef<"Appointment", 'String'>
    readonly cancelledById: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
  }

  /**
   * Appointment.prescription
   */
  export type Appointment$prescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
  }

  /**
   * Appointment.cancelledBy
   */
  export type Appointment$cancelledByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Appointment.bills
   */
  export type Appointment$billsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    where?: BillWhereInput
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    cursor?: BillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model TriageRecord
   */

  export type AggregateTriageRecord = {
    _count: TriageRecordCountAggregateOutputType | null
    _avg: TriageRecordAvgAggregateOutputType | null
    _sum: TriageRecordSumAggregateOutputType | null
    _min: TriageRecordMinAggregateOutputType | null
    _max: TriageRecordMaxAggregateOutputType | null
  }

  export type TriageRecordAvgAggregateOutputType = {
    age: number | null
  }

  export type TriageRecordSumAggregateOutputType = {
    age: number | null
  }

  export type TriageRecordMinAggregateOutputType = {
    id: string | null
    patientName: string | null
    age: number | null
    gender: string | null
    contactNumber: string | null
    symptoms: string | null
    receptionistId: string | null
    doctorReferredId: string | null
    patientId: string | null
    status: string | null
    diagnosis: string | null
    advice: string | null
    followUpDate: Date | null
    triageId: string | null
    checkedInAt: Date | null
    checkedOutAt: Date | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TriageRecordMaxAggregateOutputType = {
    id: string | null
    patientName: string | null
    age: number | null
    gender: string | null
    contactNumber: string | null
    symptoms: string | null
    receptionistId: string | null
    doctorReferredId: string | null
    patientId: string | null
    status: string | null
    diagnosis: string | null
    advice: string | null
    followUpDate: Date | null
    triageId: string | null
    checkedInAt: Date | null
    checkedOutAt: Date | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TriageRecordCountAggregateOutputType = {
    id: number
    patientName: number
    age: number
    gender: number
    contactNumber: number
    symptoms: number
    vitals: number
    aiAnalysis: number
    receptionistId: number
    doctorReferredId: number
    patientId: number
    status: number
    diagnosis: number
    prescribedMedicines: number
    tests: number
    advice: number
    followUpDate: number
    triageId: number
    checkedInAt: number
    checkedOutAt: number
    resolvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TriageRecordAvgAggregateInputType = {
    age?: true
  }

  export type TriageRecordSumAggregateInputType = {
    age?: true
  }

  export type TriageRecordMinAggregateInputType = {
    id?: true
    patientName?: true
    age?: true
    gender?: true
    contactNumber?: true
    symptoms?: true
    receptionistId?: true
    doctorReferredId?: true
    patientId?: true
    status?: true
    diagnosis?: true
    advice?: true
    followUpDate?: true
    triageId?: true
    checkedInAt?: true
    checkedOutAt?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TriageRecordMaxAggregateInputType = {
    id?: true
    patientName?: true
    age?: true
    gender?: true
    contactNumber?: true
    symptoms?: true
    receptionistId?: true
    doctorReferredId?: true
    patientId?: true
    status?: true
    diagnosis?: true
    advice?: true
    followUpDate?: true
    triageId?: true
    checkedInAt?: true
    checkedOutAt?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TriageRecordCountAggregateInputType = {
    id?: true
    patientName?: true
    age?: true
    gender?: true
    contactNumber?: true
    symptoms?: true
    vitals?: true
    aiAnalysis?: true
    receptionistId?: true
    doctorReferredId?: true
    patientId?: true
    status?: true
    diagnosis?: true
    prescribedMedicines?: true
    tests?: true
    advice?: true
    followUpDate?: true
    triageId?: true
    checkedInAt?: true
    checkedOutAt?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TriageRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TriageRecord to aggregate.
     */
    where?: TriageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TriageRecords to fetch.
     */
    orderBy?: TriageRecordOrderByWithRelationInput | TriageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TriageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TriageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TriageRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TriageRecords
    **/
    _count?: true | TriageRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TriageRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TriageRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TriageRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TriageRecordMaxAggregateInputType
  }

  export type GetTriageRecordAggregateType<T extends TriageRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateTriageRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTriageRecord[P]>
      : GetScalarType<T[P], AggregateTriageRecord[P]>
  }




  export type TriageRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TriageRecordWhereInput
    orderBy?: TriageRecordOrderByWithAggregationInput | TriageRecordOrderByWithAggregationInput[]
    by: TriageRecordScalarFieldEnum[] | TriageRecordScalarFieldEnum
    having?: TriageRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TriageRecordCountAggregateInputType | true
    _avg?: TriageRecordAvgAggregateInputType
    _sum?: TriageRecordSumAggregateInputType
    _min?: TriageRecordMinAggregateInputType
    _max?: TriageRecordMaxAggregateInputType
  }

  export type TriageRecordGroupByOutputType = {
    id: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals: JsonValue | null
    aiAnalysis: JsonValue | null
    receptionistId: string
    doctorReferredId: string | null
    patientId: string | null
    status: string
    diagnosis: string | null
    prescribedMedicines: JsonValue | null
    tests: JsonValue | null
    advice: string | null
    followUpDate: Date | null
    triageId: string
    checkedInAt: Date | null
    checkedOutAt: Date | null
    resolvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TriageRecordCountAggregateOutputType | null
    _avg: TriageRecordAvgAggregateOutputType | null
    _sum: TriageRecordSumAggregateOutputType | null
    _min: TriageRecordMinAggregateOutputType | null
    _max: TriageRecordMaxAggregateOutputType | null
  }

  type GetTriageRecordGroupByPayload<T extends TriageRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TriageRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TriageRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TriageRecordGroupByOutputType[P]>
            : GetScalarType<T[P], TriageRecordGroupByOutputType[P]>
        }
      >
    >


  export type TriageRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientName?: boolean
    age?: boolean
    gender?: boolean
    contactNumber?: boolean
    symptoms?: boolean
    vitals?: boolean
    aiAnalysis?: boolean
    receptionistId?: boolean
    doctorReferredId?: boolean
    patientId?: boolean
    status?: boolean
    diagnosis?: boolean
    prescribedMedicines?: boolean
    tests?: boolean
    advice?: boolean
    followUpDate?: boolean
    triageId?: boolean
    checkedInAt?: boolean
    checkedOutAt?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    receptionist?: boolean | UserDefaultArgs<ExtArgs>
    doctorReferred?: boolean | TriageRecord$doctorReferredArgs<ExtArgs>
    patient?: boolean | TriageRecord$patientArgs<ExtArgs>
  }, ExtArgs["result"]["triageRecord"]>

  export type TriageRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientName?: boolean
    age?: boolean
    gender?: boolean
    contactNumber?: boolean
    symptoms?: boolean
    vitals?: boolean
    aiAnalysis?: boolean
    receptionistId?: boolean
    doctorReferredId?: boolean
    patientId?: boolean
    status?: boolean
    diagnosis?: boolean
    prescribedMedicines?: boolean
    tests?: boolean
    advice?: boolean
    followUpDate?: boolean
    triageId?: boolean
    checkedInAt?: boolean
    checkedOutAt?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    receptionist?: boolean | UserDefaultArgs<ExtArgs>
    doctorReferred?: boolean | TriageRecord$doctorReferredArgs<ExtArgs>
    patient?: boolean | TriageRecord$patientArgs<ExtArgs>
  }, ExtArgs["result"]["triageRecord"]>

  export type TriageRecordSelectScalar = {
    id?: boolean
    patientName?: boolean
    age?: boolean
    gender?: boolean
    contactNumber?: boolean
    symptoms?: boolean
    vitals?: boolean
    aiAnalysis?: boolean
    receptionistId?: boolean
    doctorReferredId?: boolean
    patientId?: boolean
    status?: boolean
    diagnosis?: boolean
    prescribedMedicines?: boolean
    tests?: boolean
    advice?: boolean
    followUpDate?: boolean
    triageId?: boolean
    checkedInAt?: boolean
    checkedOutAt?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TriageRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receptionist?: boolean | UserDefaultArgs<ExtArgs>
    doctorReferred?: boolean | TriageRecord$doctorReferredArgs<ExtArgs>
    patient?: boolean | TriageRecord$patientArgs<ExtArgs>
  }
  export type TriageRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receptionist?: boolean | UserDefaultArgs<ExtArgs>
    doctorReferred?: boolean | TriageRecord$doctorReferredArgs<ExtArgs>
    patient?: boolean | TriageRecord$patientArgs<ExtArgs>
  }

  export type $TriageRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TriageRecord"
    objects: {
      receptionist: Prisma.$UserPayload<ExtArgs>
      doctorReferred: Prisma.$UserPayload<ExtArgs> | null
      patient: Prisma.$PatientPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientName: string
      age: number
      gender: string
      contactNumber: string
      symptoms: string
      vitals: Prisma.JsonValue | null
      aiAnalysis: Prisma.JsonValue | null
      receptionistId: string
      doctorReferredId: string | null
      patientId: string | null
      status: string
      diagnosis: string | null
      prescribedMedicines: Prisma.JsonValue | null
      tests: Prisma.JsonValue | null
      advice: string | null
      followUpDate: Date | null
      triageId: string
      checkedInAt: Date | null
      checkedOutAt: Date | null
      resolvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["triageRecord"]>
    composites: {}
  }

  type TriageRecordGetPayload<S extends boolean | null | undefined | TriageRecordDefaultArgs> = $Result.GetResult<Prisma.$TriageRecordPayload, S>

  type TriageRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TriageRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TriageRecordCountAggregateInputType | true
    }

  export interface TriageRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TriageRecord'], meta: { name: 'TriageRecord' } }
    /**
     * Find zero or one TriageRecord that matches the filter.
     * @param {TriageRecordFindUniqueArgs} args - Arguments to find a TriageRecord
     * @example
     * // Get one TriageRecord
     * const triageRecord = await prisma.triageRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TriageRecordFindUniqueArgs>(args: SelectSubset<T, TriageRecordFindUniqueArgs<ExtArgs>>): Prisma__TriageRecordClient<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TriageRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TriageRecordFindUniqueOrThrowArgs} args - Arguments to find a TriageRecord
     * @example
     * // Get one TriageRecord
     * const triageRecord = await prisma.triageRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TriageRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, TriageRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TriageRecordClient<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TriageRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageRecordFindFirstArgs} args - Arguments to find a TriageRecord
     * @example
     * // Get one TriageRecord
     * const triageRecord = await prisma.triageRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TriageRecordFindFirstArgs>(args?: SelectSubset<T, TriageRecordFindFirstArgs<ExtArgs>>): Prisma__TriageRecordClient<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TriageRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageRecordFindFirstOrThrowArgs} args - Arguments to find a TriageRecord
     * @example
     * // Get one TriageRecord
     * const triageRecord = await prisma.triageRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TriageRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, TriageRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__TriageRecordClient<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TriageRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TriageRecords
     * const triageRecords = await prisma.triageRecord.findMany()
     * 
     * // Get first 10 TriageRecords
     * const triageRecords = await prisma.triageRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const triageRecordWithIdOnly = await prisma.triageRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TriageRecordFindManyArgs>(args?: SelectSubset<T, TriageRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TriageRecord.
     * @param {TriageRecordCreateArgs} args - Arguments to create a TriageRecord.
     * @example
     * // Create one TriageRecord
     * const TriageRecord = await prisma.triageRecord.create({
     *   data: {
     *     // ... data to create a TriageRecord
     *   }
     * })
     * 
     */
    create<T extends TriageRecordCreateArgs>(args: SelectSubset<T, TriageRecordCreateArgs<ExtArgs>>): Prisma__TriageRecordClient<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TriageRecords.
     * @param {TriageRecordCreateManyArgs} args - Arguments to create many TriageRecords.
     * @example
     * // Create many TriageRecords
     * const triageRecord = await prisma.triageRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TriageRecordCreateManyArgs>(args?: SelectSubset<T, TriageRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TriageRecords and returns the data saved in the database.
     * @param {TriageRecordCreateManyAndReturnArgs} args - Arguments to create many TriageRecords.
     * @example
     * // Create many TriageRecords
     * const triageRecord = await prisma.triageRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TriageRecords and only return the `id`
     * const triageRecordWithIdOnly = await prisma.triageRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TriageRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, TriageRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TriageRecord.
     * @param {TriageRecordDeleteArgs} args - Arguments to delete one TriageRecord.
     * @example
     * // Delete one TriageRecord
     * const TriageRecord = await prisma.triageRecord.delete({
     *   where: {
     *     // ... filter to delete one TriageRecord
     *   }
     * })
     * 
     */
    delete<T extends TriageRecordDeleteArgs>(args: SelectSubset<T, TriageRecordDeleteArgs<ExtArgs>>): Prisma__TriageRecordClient<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TriageRecord.
     * @param {TriageRecordUpdateArgs} args - Arguments to update one TriageRecord.
     * @example
     * // Update one TriageRecord
     * const triageRecord = await prisma.triageRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TriageRecordUpdateArgs>(args: SelectSubset<T, TriageRecordUpdateArgs<ExtArgs>>): Prisma__TriageRecordClient<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TriageRecords.
     * @param {TriageRecordDeleteManyArgs} args - Arguments to filter TriageRecords to delete.
     * @example
     * // Delete a few TriageRecords
     * const { count } = await prisma.triageRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TriageRecordDeleteManyArgs>(args?: SelectSubset<T, TriageRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TriageRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TriageRecords
     * const triageRecord = await prisma.triageRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TriageRecordUpdateManyArgs>(args: SelectSubset<T, TriageRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TriageRecord.
     * @param {TriageRecordUpsertArgs} args - Arguments to update or create a TriageRecord.
     * @example
     * // Update or create a TriageRecord
     * const triageRecord = await prisma.triageRecord.upsert({
     *   create: {
     *     // ... data to create a TriageRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TriageRecord we want to update
     *   }
     * })
     */
    upsert<T extends TriageRecordUpsertArgs>(args: SelectSubset<T, TriageRecordUpsertArgs<ExtArgs>>): Prisma__TriageRecordClient<$Result.GetResult<Prisma.$TriageRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TriageRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageRecordCountArgs} args - Arguments to filter TriageRecords to count.
     * @example
     * // Count the number of TriageRecords
     * const count = await prisma.triageRecord.count({
     *   where: {
     *     // ... the filter for the TriageRecords we want to count
     *   }
     * })
    **/
    count<T extends TriageRecordCountArgs>(
      args?: Subset<T, TriageRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TriageRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TriageRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TriageRecordAggregateArgs>(args: Subset<T, TriageRecordAggregateArgs>): Prisma.PrismaPromise<GetTriageRecordAggregateType<T>>

    /**
     * Group by TriageRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageRecordGroupByArgs} args - Group by arguments.
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
      T extends TriageRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TriageRecordGroupByArgs['orderBy'] }
        : { orderBy?: TriageRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TriageRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTriageRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TriageRecord model
   */
  readonly fields: TriageRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TriageRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TriageRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    receptionist<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    doctorReferred<T extends TriageRecord$doctorReferredArgs<ExtArgs> = {}>(args?: Subset<T, TriageRecord$doctorReferredArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    patient<T extends TriageRecord$patientArgs<ExtArgs> = {}>(args?: Subset<T, TriageRecord$patientArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TriageRecord model
   */ 
  interface TriageRecordFieldRefs {
    readonly id: FieldRef<"TriageRecord", 'String'>
    readonly patientName: FieldRef<"TriageRecord", 'String'>
    readonly age: FieldRef<"TriageRecord", 'Int'>
    readonly gender: FieldRef<"TriageRecord", 'String'>
    readonly contactNumber: FieldRef<"TriageRecord", 'String'>
    readonly symptoms: FieldRef<"TriageRecord", 'String'>
    readonly vitals: FieldRef<"TriageRecord", 'Json'>
    readonly aiAnalysis: FieldRef<"TriageRecord", 'Json'>
    readonly receptionistId: FieldRef<"TriageRecord", 'String'>
    readonly doctorReferredId: FieldRef<"TriageRecord", 'String'>
    readonly patientId: FieldRef<"TriageRecord", 'String'>
    readonly status: FieldRef<"TriageRecord", 'String'>
    readonly diagnosis: FieldRef<"TriageRecord", 'String'>
    readonly prescribedMedicines: FieldRef<"TriageRecord", 'Json'>
    readonly tests: FieldRef<"TriageRecord", 'Json'>
    readonly advice: FieldRef<"TriageRecord", 'String'>
    readonly followUpDate: FieldRef<"TriageRecord", 'DateTime'>
    readonly triageId: FieldRef<"TriageRecord", 'String'>
    readonly checkedInAt: FieldRef<"TriageRecord", 'DateTime'>
    readonly checkedOutAt: FieldRef<"TriageRecord", 'DateTime'>
    readonly resolvedAt: FieldRef<"TriageRecord", 'DateTime'>
    readonly createdAt: FieldRef<"TriageRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"TriageRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TriageRecord findUnique
   */
  export type TriageRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    /**
     * Filter, which TriageRecord to fetch.
     */
    where: TriageRecordWhereUniqueInput
  }

  /**
   * TriageRecord findUniqueOrThrow
   */
  export type TriageRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    /**
     * Filter, which TriageRecord to fetch.
     */
    where: TriageRecordWhereUniqueInput
  }

  /**
   * TriageRecord findFirst
   */
  export type TriageRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    /**
     * Filter, which TriageRecord to fetch.
     */
    where?: TriageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TriageRecords to fetch.
     */
    orderBy?: TriageRecordOrderByWithRelationInput | TriageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TriageRecords.
     */
    cursor?: TriageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TriageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TriageRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TriageRecords.
     */
    distinct?: TriageRecordScalarFieldEnum | TriageRecordScalarFieldEnum[]
  }

  /**
   * TriageRecord findFirstOrThrow
   */
  export type TriageRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    /**
     * Filter, which TriageRecord to fetch.
     */
    where?: TriageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TriageRecords to fetch.
     */
    orderBy?: TriageRecordOrderByWithRelationInput | TriageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TriageRecords.
     */
    cursor?: TriageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TriageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TriageRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TriageRecords.
     */
    distinct?: TriageRecordScalarFieldEnum | TriageRecordScalarFieldEnum[]
  }

  /**
   * TriageRecord findMany
   */
  export type TriageRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    /**
     * Filter, which TriageRecords to fetch.
     */
    where?: TriageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TriageRecords to fetch.
     */
    orderBy?: TriageRecordOrderByWithRelationInput | TriageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TriageRecords.
     */
    cursor?: TriageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TriageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TriageRecords.
     */
    skip?: number
    distinct?: TriageRecordScalarFieldEnum | TriageRecordScalarFieldEnum[]
  }

  /**
   * TriageRecord create
   */
  export type TriageRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a TriageRecord.
     */
    data: XOR<TriageRecordCreateInput, TriageRecordUncheckedCreateInput>
  }

  /**
   * TriageRecord createMany
   */
  export type TriageRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TriageRecords.
     */
    data: TriageRecordCreateManyInput | TriageRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TriageRecord createManyAndReturn
   */
  export type TriageRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TriageRecords.
     */
    data: TriageRecordCreateManyInput | TriageRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TriageRecord update
   */
  export type TriageRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a TriageRecord.
     */
    data: XOR<TriageRecordUpdateInput, TriageRecordUncheckedUpdateInput>
    /**
     * Choose, which TriageRecord to update.
     */
    where: TriageRecordWhereUniqueInput
  }

  /**
   * TriageRecord updateMany
   */
  export type TriageRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TriageRecords.
     */
    data: XOR<TriageRecordUpdateManyMutationInput, TriageRecordUncheckedUpdateManyInput>
    /**
     * Filter which TriageRecords to update
     */
    where?: TriageRecordWhereInput
  }

  /**
   * TriageRecord upsert
   */
  export type TriageRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the TriageRecord to update in case it exists.
     */
    where: TriageRecordWhereUniqueInput
    /**
     * In case the TriageRecord found by the `where` argument doesn't exist, create a new TriageRecord with this data.
     */
    create: XOR<TriageRecordCreateInput, TriageRecordUncheckedCreateInput>
    /**
     * In case the TriageRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TriageRecordUpdateInput, TriageRecordUncheckedUpdateInput>
  }

  /**
   * TriageRecord delete
   */
  export type TriageRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
    /**
     * Filter which TriageRecord to delete.
     */
    where: TriageRecordWhereUniqueInput
  }

  /**
   * TriageRecord deleteMany
   */
  export type TriageRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TriageRecords to delete
     */
    where?: TriageRecordWhereInput
  }

  /**
   * TriageRecord.doctorReferred
   */
  export type TriageRecord$doctorReferredArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TriageRecord.patient
   */
  export type TriageRecord$patientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
  }

  /**
   * TriageRecord without action
   */
  export type TriageRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageRecord
     */
    select?: TriageRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageRecordInclude<ExtArgs> | null
  }


  /**
   * Model Bill
   */

  export type AggregateBill = {
    _count: BillCountAggregateOutputType | null
    _avg: BillAvgAggregateOutputType | null
    _sum: BillSumAggregateOutputType | null
    _min: BillMinAggregateOutputType | null
    _max: BillMaxAggregateOutputType | null
  }

  export type BillAvgAggregateOutputType = {
    subtotal: number | null
    tax: number | null
    total: number | null
  }

  export type BillSumAggregateOutputType = {
    subtotal: number | null
    tax: number | null
    total: number | null
  }

  export type BillMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    triageId: string | null
    appointmentId: string | null
    subtotal: number | null
    tax: number | null
    total: number | null
    status: string | null
    dueDate: Date | null
    paymentMethod: string | null
    receipt: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BillMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    triageId: string | null
    appointmentId: string | null
    subtotal: number | null
    tax: number | null
    total: number | null
    status: string | null
    dueDate: Date | null
    paymentMethod: string | null
    receipt: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BillCountAggregateOutputType = {
    id: number
    patientId: number
    triageId: number
    appointmentId: number
    items: number
    subtotal: number
    tax: number
    total: number
    status: number
    dueDate: number
    paymentMethod: number
    paymentDetails: number
    receipt: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BillAvgAggregateInputType = {
    subtotal?: true
    tax?: true
    total?: true
  }

  export type BillSumAggregateInputType = {
    subtotal?: true
    tax?: true
    total?: true
  }

  export type BillMinAggregateInputType = {
    id?: true
    patientId?: true
    triageId?: true
    appointmentId?: true
    subtotal?: true
    tax?: true
    total?: true
    status?: true
    dueDate?: true
    paymentMethod?: true
    receipt?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BillMaxAggregateInputType = {
    id?: true
    patientId?: true
    triageId?: true
    appointmentId?: true
    subtotal?: true
    tax?: true
    total?: true
    status?: true
    dueDate?: true
    paymentMethod?: true
    receipt?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BillCountAggregateInputType = {
    id?: true
    patientId?: true
    triageId?: true
    appointmentId?: true
    items?: true
    subtotal?: true
    tax?: true
    total?: true
    status?: true
    dueDate?: true
    paymentMethod?: true
    paymentDetails?: true
    receipt?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bill to aggregate.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bills
    **/
    _count?: true | BillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillMaxAggregateInputType
  }

  export type GetBillAggregateType<T extends BillAggregateArgs> = {
        [P in keyof T & keyof AggregateBill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBill[P]>
      : GetScalarType<T[P], AggregateBill[P]>
  }




  export type BillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
    orderBy?: BillOrderByWithAggregationInput | BillOrderByWithAggregationInput[]
    by: BillScalarFieldEnum[] | BillScalarFieldEnum
    having?: BillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillCountAggregateInputType | true
    _avg?: BillAvgAggregateInputType
    _sum?: BillSumAggregateInputType
    _min?: BillMinAggregateInputType
    _max?: BillMaxAggregateInputType
  }

  export type BillGroupByOutputType = {
    id: string
    patientId: string | null
    triageId: string | null
    appointmentId: string | null
    items: JsonValue
    subtotal: number
    tax: number
    total: number
    status: string
    dueDate: Date | null
    paymentMethod: string | null
    paymentDetails: JsonValue | null
    receipt: string | null
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: BillCountAggregateOutputType | null
    _avg: BillAvgAggregateOutputType | null
    _sum: BillSumAggregateOutputType | null
    _min: BillMinAggregateOutputType | null
    _max: BillMaxAggregateOutputType | null
  }

  type GetBillGroupByPayload<T extends BillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillGroupByOutputType[P]>
            : GetScalarType<T[P], BillGroupByOutputType[P]>
        }
      >
    >


  export type BillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    triageId?: boolean
    appointmentId?: boolean
    items?: boolean
    subtotal?: boolean
    tax?: boolean
    total?: boolean
    status?: boolean
    dueDate?: boolean
    paymentMethod?: boolean
    paymentDetails?: boolean
    receipt?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | Bill$patientArgs<ExtArgs>
    appointment?: boolean | Bill$appointmentArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bill"]>

  export type BillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    triageId?: boolean
    appointmentId?: boolean
    items?: boolean
    subtotal?: boolean
    tax?: boolean
    total?: boolean
    status?: boolean
    dueDate?: boolean
    paymentMethod?: boolean
    paymentDetails?: boolean
    receipt?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | Bill$patientArgs<ExtArgs>
    appointment?: boolean | Bill$appointmentArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bill"]>

  export type BillSelectScalar = {
    id?: boolean
    patientId?: boolean
    triageId?: boolean
    appointmentId?: boolean
    items?: boolean
    subtotal?: boolean
    tax?: boolean
    total?: boolean
    status?: boolean
    dueDate?: boolean
    paymentMethod?: boolean
    paymentDetails?: boolean
    receipt?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | Bill$patientArgs<ExtArgs>
    appointment?: boolean | Bill$appointmentArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | Bill$patientArgs<ExtArgs>
    appointment?: boolean | Bill$appointmentArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bill"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs> | null
      appointment: Prisma.$AppointmentPayload<ExtArgs> | null
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string | null
      triageId: string | null
      appointmentId: string | null
      items: Prisma.JsonValue
      subtotal: number
      tax: number
      total: number
      status: string
      dueDate: Date | null
      paymentMethod: string | null
      paymentDetails: Prisma.JsonValue | null
      receipt: string | null
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bill"]>
    composites: {}
  }

  type BillGetPayload<S extends boolean | null | undefined | BillDefaultArgs> = $Result.GetResult<Prisma.$BillPayload, S>

  type BillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BillFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BillCountAggregateInputType | true
    }

  export interface BillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bill'], meta: { name: 'Bill' } }
    /**
     * Find zero or one Bill that matches the filter.
     * @param {BillFindUniqueArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillFindUniqueArgs>(args: SelectSubset<T, BillFindUniqueArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Bill that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BillFindUniqueOrThrowArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillFindUniqueOrThrowArgs>(args: SelectSubset<T, BillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Bill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindFirstArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillFindFirstArgs>(args?: SelectSubset<T, BillFindFirstArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Bill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindFirstOrThrowArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillFindFirstOrThrowArgs>(args?: SelectSubset<T, BillFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bills
     * const bills = await prisma.bill.findMany()
     * 
     * // Get first 10 Bills
     * const bills = await prisma.bill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billWithIdOnly = await prisma.bill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillFindManyArgs>(args?: SelectSubset<T, BillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Bill.
     * @param {BillCreateArgs} args - Arguments to create a Bill.
     * @example
     * // Create one Bill
     * const Bill = await prisma.bill.create({
     *   data: {
     *     // ... data to create a Bill
     *   }
     * })
     * 
     */
    create<T extends BillCreateArgs>(args: SelectSubset<T, BillCreateArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bills.
     * @param {BillCreateManyArgs} args - Arguments to create many Bills.
     * @example
     * // Create many Bills
     * const bill = await prisma.bill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillCreateManyArgs>(args?: SelectSubset<T, BillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bills and returns the data saved in the database.
     * @param {BillCreateManyAndReturnArgs} args - Arguments to create many Bills.
     * @example
     * // Create many Bills
     * const bill = await prisma.bill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bills and only return the `id`
     * const billWithIdOnly = await prisma.bill.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BillCreateManyAndReturnArgs>(args?: SelectSubset<T, BillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Bill.
     * @param {BillDeleteArgs} args - Arguments to delete one Bill.
     * @example
     * // Delete one Bill
     * const Bill = await prisma.bill.delete({
     *   where: {
     *     // ... filter to delete one Bill
     *   }
     * })
     * 
     */
    delete<T extends BillDeleteArgs>(args: SelectSubset<T, BillDeleteArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Bill.
     * @param {BillUpdateArgs} args - Arguments to update one Bill.
     * @example
     * // Update one Bill
     * const bill = await prisma.bill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillUpdateArgs>(args: SelectSubset<T, BillUpdateArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bills.
     * @param {BillDeleteManyArgs} args - Arguments to filter Bills to delete.
     * @example
     * // Delete a few Bills
     * const { count } = await prisma.bill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillDeleteManyArgs>(args?: SelectSubset<T, BillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bills
     * const bill = await prisma.bill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillUpdateManyArgs>(args: SelectSubset<T, BillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bill.
     * @param {BillUpsertArgs} args - Arguments to update or create a Bill.
     * @example
     * // Update or create a Bill
     * const bill = await prisma.bill.upsert({
     *   create: {
     *     // ... data to create a Bill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bill we want to update
     *   }
     * })
     */
    upsert<T extends BillUpsertArgs>(args: SelectSubset<T, BillUpsertArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillCountArgs} args - Arguments to filter Bills to count.
     * @example
     * // Count the number of Bills
     * const count = await prisma.bill.count({
     *   where: {
     *     // ... the filter for the Bills we want to count
     *   }
     * })
    **/
    count<T extends BillCountArgs>(
      args?: Subset<T, BillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BillAggregateArgs>(args: Subset<T, BillAggregateArgs>): Prisma.PrismaPromise<GetBillAggregateType<T>>

    /**
     * Group by Bill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillGroupByArgs} args - Group by arguments.
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
      T extends BillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillGroupByArgs['orderBy'] }
        : { orderBy?: BillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bill model
   */
  readonly fields: BillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends Bill$patientArgs<ExtArgs> = {}>(args?: Subset<T, Bill$patientArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    appointment<T extends Bill$appointmentArgs<ExtArgs> = {}>(args?: Subset<T, Bill$appointmentArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bill model
   */ 
  interface BillFieldRefs {
    readonly id: FieldRef<"Bill", 'String'>
    readonly patientId: FieldRef<"Bill", 'String'>
    readonly triageId: FieldRef<"Bill", 'String'>
    readonly appointmentId: FieldRef<"Bill", 'String'>
    readonly items: FieldRef<"Bill", 'Json'>
    readonly subtotal: FieldRef<"Bill", 'Float'>
    readonly tax: FieldRef<"Bill", 'Float'>
    readonly total: FieldRef<"Bill", 'Float'>
    readonly status: FieldRef<"Bill", 'String'>
    readonly dueDate: FieldRef<"Bill", 'DateTime'>
    readonly paymentMethod: FieldRef<"Bill", 'String'>
    readonly paymentDetails: FieldRef<"Bill", 'Json'>
    readonly receipt: FieldRef<"Bill", 'String'>
    readonly createdById: FieldRef<"Bill", 'String'>
    readonly createdAt: FieldRef<"Bill", 'DateTime'>
    readonly updatedAt: FieldRef<"Bill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bill findUnique
   */
  export type BillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill findUniqueOrThrow
   */
  export type BillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill findFirst
   */
  export type BillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bills.
     */
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill findFirstOrThrow
   */
  export type BillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bills.
     */
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill findMany
   */
  export type BillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bills to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill create
   */
  export type BillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The data needed to create a Bill.
     */
    data: XOR<BillCreateInput, BillUncheckedCreateInput>
  }

  /**
   * Bill createMany
   */
  export type BillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bills.
     */
    data: BillCreateManyInput | BillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bill createManyAndReturn
   */
  export type BillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Bills.
     */
    data: BillCreateManyInput | BillCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bill update
   */
  export type BillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The data needed to update a Bill.
     */
    data: XOR<BillUpdateInput, BillUncheckedUpdateInput>
    /**
     * Choose, which Bill to update.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill updateMany
   */
  export type BillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bills.
     */
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyInput>
    /**
     * Filter which Bills to update
     */
    where?: BillWhereInput
  }

  /**
   * Bill upsert
   */
  export type BillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The filter to search for the Bill to update in case it exists.
     */
    where: BillWhereUniqueInput
    /**
     * In case the Bill found by the `where` argument doesn't exist, create a new Bill with this data.
     */
    create: XOR<BillCreateInput, BillUncheckedCreateInput>
    /**
     * In case the Bill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillUpdateInput, BillUncheckedUpdateInput>
  }

  /**
   * Bill delete
   */
  export type BillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter which Bill to delete.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill deleteMany
   */
  export type BillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bills to delete
     */
    where?: BillWhereInput
  }

  /**
   * Bill.patient
   */
  export type Bill$patientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
  }

  /**
   * Bill.appointment
   */
  export type Bill$appointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
  }

  /**
   * Bill without action
   */
  export type BillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
  }


  /**
   * Model Prescription
   */

  export type AggregatePrescription = {
    _count: PrescriptionCountAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  export type PrescriptionMinAggregateOutputType = {
    id: string | null
    appointmentId: string | null
    patientId: string | null
    doctorId: string | null
    diagnosis: string | null
    advice: string | null
    followUpDate: Date | null
    receipt: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrescriptionMaxAggregateOutputType = {
    id: string | null
    appointmentId: string | null
    patientId: string | null
    doctorId: string | null
    diagnosis: string | null
    advice: string | null
    followUpDate: Date | null
    receipt: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrescriptionCountAggregateOutputType = {
    id: number
    appointmentId: number
    patientId: number
    doctorId: number
    diagnosis: number
    medicines: number
    tests: number
    advice: number
    followUpDate: number
    receipt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrescriptionMinAggregateInputType = {
    id?: true
    appointmentId?: true
    patientId?: true
    doctorId?: true
    diagnosis?: true
    advice?: true
    followUpDate?: true
    receipt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrescriptionMaxAggregateInputType = {
    id?: true
    appointmentId?: true
    patientId?: true
    doctorId?: true
    diagnosis?: true
    advice?: true
    followUpDate?: true
    receipt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrescriptionCountAggregateInputType = {
    id?: true
    appointmentId?: true
    patientId?: true
    doctorId?: true
    diagnosis?: true
    medicines?: true
    tests?: true
    advice?: true
    followUpDate?: true
    receipt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrescriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescription to aggregate.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prescriptions
    **/
    _count?: true | PrescriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrescriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrescriptionMaxAggregateInputType
  }

  export type GetPrescriptionAggregateType<T extends PrescriptionAggregateArgs> = {
        [P in keyof T & keyof AggregatePrescription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrescription[P]>
      : GetScalarType<T[P], AggregatePrescription[P]>
  }




  export type PrescriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithAggregationInput | PrescriptionOrderByWithAggregationInput[]
    by: PrescriptionScalarFieldEnum[] | PrescriptionScalarFieldEnum
    having?: PrescriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrescriptionCountAggregateInputType | true
    _min?: PrescriptionMinAggregateInputType
    _max?: PrescriptionMaxAggregateInputType
  }

  export type PrescriptionGroupByOutputType = {
    id: string
    appointmentId: string
    patientId: string
    doctorId: string
    diagnosis: string
    medicines: JsonValue
    tests: JsonValue | null
    advice: string | null
    followUpDate: Date | null
    receipt: string | null
    createdAt: Date
    updatedAt: Date
    _count: PrescriptionCountAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  type GetPrescriptionGroupByPayload<T extends PrescriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrescriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrescriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
            : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
        }
      >
    >


  export type PrescriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointmentId?: boolean
    patientId?: boolean
    doctorId?: boolean
    diagnosis?: boolean
    medicines?: boolean
    tests?: boolean
    advice?: boolean
    followUpDate?: boolean
    receipt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    appointment?: boolean | Prescription$appointmentArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointmentId?: boolean
    patientId?: boolean
    doctorId?: boolean
    diagnosis?: boolean
    medicines?: boolean
    tests?: boolean
    advice?: boolean
    followUpDate?: boolean
    receipt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectScalar = {
    id?: boolean
    appointmentId?: boolean
    patientId?: boolean
    doctorId?: boolean
    diagnosis?: boolean
    medicines?: boolean
    tests?: boolean
    advice?: boolean
    followUpDate?: boolean
    receipt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PrescriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointment?: boolean | Prescription$appointmentArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }
  export type PrescriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }

  export type $PrescriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prescription"
    objects: {
      appointment: Prisma.$AppointmentPayload<ExtArgs> | null
      patient: Prisma.$PatientPayload<ExtArgs>
      doctor: Prisma.$DoctorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      appointmentId: string
      patientId: string
      doctorId: string
      diagnosis: string
      medicines: Prisma.JsonValue
      tests: Prisma.JsonValue | null
      advice: string | null
      followUpDate: Date | null
      receipt: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["prescription"]>
    composites: {}
  }

  type PrescriptionGetPayload<S extends boolean | null | undefined | PrescriptionDefaultArgs> = $Result.GetResult<Prisma.$PrescriptionPayload, S>

  type PrescriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PrescriptionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PrescriptionCountAggregateInputType | true
    }

  export interface PrescriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prescription'], meta: { name: 'Prescription' } }
    /**
     * Find zero or one Prescription that matches the filter.
     * @param {PrescriptionFindUniqueArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrescriptionFindUniqueArgs>(args: SelectSubset<T, PrescriptionFindUniqueArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Prescription that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PrescriptionFindUniqueOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrescriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, PrescriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Prescription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrescriptionFindFirstArgs>(args?: SelectSubset<T, PrescriptionFindFirstArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Prescription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrescriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, PrescriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Prescriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prescriptions
     * const prescriptions = await prisma.prescription.findMany()
     * 
     * // Get first 10 Prescriptions
     * const prescriptions = await prisma.prescription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrescriptionFindManyArgs>(args?: SelectSubset<T, PrescriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Prescription.
     * @param {PrescriptionCreateArgs} args - Arguments to create a Prescription.
     * @example
     * // Create one Prescription
     * const Prescription = await prisma.prescription.create({
     *   data: {
     *     // ... data to create a Prescription
     *   }
     * })
     * 
     */
    create<T extends PrescriptionCreateArgs>(args: SelectSubset<T, PrescriptionCreateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Prescriptions.
     * @param {PrescriptionCreateManyArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrescriptionCreateManyArgs>(args?: SelectSubset<T, PrescriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prescriptions and returns the data saved in the database.
     * @param {PrescriptionCreateManyAndReturnArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prescriptions and only return the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrescriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, PrescriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Prescription.
     * @param {PrescriptionDeleteArgs} args - Arguments to delete one Prescription.
     * @example
     * // Delete one Prescription
     * const Prescription = await prisma.prescription.delete({
     *   where: {
     *     // ... filter to delete one Prescription
     *   }
     * })
     * 
     */
    delete<T extends PrescriptionDeleteArgs>(args: SelectSubset<T, PrescriptionDeleteArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Prescription.
     * @param {PrescriptionUpdateArgs} args - Arguments to update one Prescription.
     * @example
     * // Update one Prescription
     * const prescription = await prisma.prescription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrescriptionUpdateArgs>(args: SelectSubset<T, PrescriptionUpdateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Prescriptions.
     * @param {PrescriptionDeleteManyArgs} args - Arguments to filter Prescriptions to delete.
     * @example
     * // Delete a few Prescriptions
     * const { count } = await prisma.prescription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrescriptionDeleteManyArgs>(args?: SelectSubset<T, PrescriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrescriptionUpdateManyArgs>(args: SelectSubset<T, PrescriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Prescription.
     * @param {PrescriptionUpsertArgs} args - Arguments to update or create a Prescription.
     * @example
     * // Update or create a Prescription
     * const prescription = await prisma.prescription.upsert({
     *   create: {
     *     // ... data to create a Prescription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prescription we want to update
     *   }
     * })
     */
    upsert<T extends PrescriptionUpsertArgs>(args: SelectSubset<T, PrescriptionUpsertArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionCountArgs} args - Arguments to filter Prescriptions to count.
     * @example
     * // Count the number of Prescriptions
     * const count = await prisma.prescription.count({
     *   where: {
     *     // ... the filter for the Prescriptions we want to count
     *   }
     * })
    **/
    count<T extends PrescriptionCountArgs>(
      args?: Subset<T, PrescriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrescriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PrescriptionAggregateArgs>(args: Subset<T, PrescriptionAggregateArgs>): Prisma.PrismaPromise<GetPrescriptionAggregateType<T>>

    /**
     * Group by Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionGroupByArgs} args - Group by arguments.
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
      T extends PrescriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrescriptionGroupByArgs['orderBy'] }
        : { orderBy?: PrescriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrescriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrescriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prescription model
   */
  readonly fields: PrescriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prescription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrescriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    appointment<T extends Prescription$appointmentArgs<ExtArgs> = {}>(args?: Subset<T, Prescription$appointmentArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prescription model
   */ 
  interface PrescriptionFieldRefs {
    readonly id: FieldRef<"Prescription", 'String'>
    readonly appointmentId: FieldRef<"Prescription", 'String'>
    readonly patientId: FieldRef<"Prescription", 'String'>
    readonly doctorId: FieldRef<"Prescription", 'String'>
    readonly diagnosis: FieldRef<"Prescription", 'String'>
    readonly medicines: FieldRef<"Prescription", 'Json'>
    readonly tests: FieldRef<"Prescription", 'Json'>
    readonly advice: FieldRef<"Prescription", 'String'>
    readonly followUpDate: FieldRef<"Prescription", 'DateTime'>
    readonly receipt: FieldRef<"Prescription", 'String'>
    readonly createdAt: FieldRef<"Prescription", 'DateTime'>
    readonly updatedAt: FieldRef<"Prescription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Prescription findUnique
   */
  export type PrescriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findUniqueOrThrow
   */
  export type PrescriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findFirst
   */
  export type PrescriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findFirstOrThrow
   */
  export type PrescriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findMany
   */
  export type PrescriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescriptions to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription create
   */
  export type PrescriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Prescription.
     */
    data: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
  }

  /**
   * Prescription createMany
   */
  export type PrescriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prescription createManyAndReturn
   */
  export type PrescriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prescription update
   */
  export type PrescriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Prescription.
     */
    data: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
    /**
     * Choose, which Prescription to update.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription updateMany
   */
  export type PrescriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prescriptions.
     */
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyInput>
    /**
     * Filter which Prescriptions to update
     */
    where?: PrescriptionWhereInput
  }

  /**
   * Prescription upsert
   */
  export type PrescriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Prescription to update in case it exists.
     */
    where: PrescriptionWhereUniqueInput
    /**
     * In case the Prescription found by the `where` argument doesn't exist, create a new Prescription with this data.
     */
    create: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
    /**
     * In case the Prescription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
  }

  /**
   * Prescription delete
   */
  export type PrescriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter which Prescription to delete.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription deleteMany
   */
  export type PrescriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescriptions to delete
     */
    where?: PrescriptionWhereInput
  }

  /**
   * Prescription.appointment
   */
  export type Prescription$appointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
  }

  /**
   * Prescription without action
   */
  export type PrescriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
  }


  /**
   * Model LabReport
   */

  export type AggregateLabReport = {
    _count: LabReportCountAggregateOutputType | null
    _min: LabReportMinAggregateOutputType | null
    _max: LabReportMaxAggregateOutputType | null
  }

  export type LabReportMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    testName: string | null
    testType: string | null
    reportDate: Date | null
    doctorId: string | null
    conclusion: string | null
    recommendations: string | null
    reportFile: string | null
    uploadedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LabReportMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    testName: string | null
    testType: string | null
    reportDate: Date | null
    doctorId: string | null
    conclusion: string | null
    recommendations: string | null
    reportFile: string | null
    uploadedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LabReportCountAggregateOutputType = {
    id: number
    patientId: number
    testName: number
    testType: number
    reportDate: number
    doctorId: number
    results: number
    conclusion: number
    recommendations: number
    reportFile: number
    uploadedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LabReportMinAggregateInputType = {
    id?: true
    patientId?: true
    testName?: true
    testType?: true
    reportDate?: true
    doctorId?: true
    conclusion?: true
    recommendations?: true
    reportFile?: true
    uploadedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LabReportMaxAggregateInputType = {
    id?: true
    patientId?: true
    testName?: true
    testType?: true
    reportDate?: true
    doctorId?: true
    conclusion?: true
    recommendations?: true
    reportFile?: true
    uploadedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LabReportCountAggregateInputType = {
    id?: true
    patientId?: true
    testName?: true
    testType?: true
    reportDate?: true
    doctorId?: true
    results?: true
    conclusion?: true
    recommendations?: true
    reportFile?: true
    uploadedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LabReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LabReport to aggregate.
     */
    where?: LabReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LabReports to fetch.
     */
    orderBy?: LabReportOrderByWithRelationInput | LabReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LabReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LabReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LabReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LabReports
    **/
    _count?: true | LabReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LabReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LabReportMaxAggregateInputType
  }

  export type GetLabReportAggregateType<T extends LabReportAggregateArgs> = {
        [P in keyof T & keyof AggregateLabReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLabReport[P]>
      : GetScalarType<T[P], AggregateLabReport[P]>
  }




  export type LabReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabReportWhereInput
    orderBy?: LabReportOrderByWithAggregationInput | LabReportOrderByWithAggregationInput[]
    by: LabReportScalarFieldEnum[] | LabReportScalarFieldEnum
    having?: LabReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LabReportCountAggregateInputType | true
    _min?: LabReportMinAggregateInputType
    _max?: LabReportMaxAggregateInputType
  }

  export type LabReportGroupByOutputType = {
    id: string
    patientId: string
    testName: string
    testType: string
    reportDate: Date
    doctorId: string | null
    results: JsonValue
    conclusion: string | null
    recommendations: string | null
    reportFile: string
    uploadedById: string
    createdAt: Date
    updatedAt: Date
    _count: LabReportCountAggregateOutputType | null
    _min: LabReportMinAggregateOutputType | null
    _max: LabReportMaxAggregateOutputType | null
  }

  type GetLabReportGroupByPayload<T extends LabReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LabReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LabReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LabReportGroupByOutputType[P]>
            : GetScalarType<T[P], LabReportGroupByOutputType[P]>
        }
      >
    >


  export type LabReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    testName?: boolean
    testType?: boolean
    reportDate?: boolean
    doctorId?: boolean
    results?: boolean
    conclusion?: boolean
    recommendations?: boolean
    reportFile?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | LabReport$doctorArgs<ExtArgs>
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["labReport"]>

  export type LabReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    testName?: boolean
    testType?: boolean
    reportDate?: boolean
    doctorId?: boolean
    results?: boolean
    conclusion?: boolean
    recommendations?: boolean
    reportFile?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | LabReport$doctorArgs<ExtArgs>
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["labReport"]>

  export type LabReportSelectScalar = {
    id?: boolean
    patientId?: boolean
    testName?: boolean
    testType?: boolean
    reportDate?: boolean
    doctorId?: boolean
    results?: boolean
    conclusion?: boolean
    recommendations?: boolean
    reportFile?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LabReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | LabReport$doctorArgs<ExtArgs>
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LabReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | LabReport$doctorArgs<ExtArgs>
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LabReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LabReport"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      doctor: Prisma.$DoctorPayload<ExtArgs> | null
      uploadedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      testName: string
      testType: string
      reportDate: Date
      doctorId: string | null
      results: Prisma.JsonValue
      conclusion: string | null
      recommendations: string | null
      reportFile: string
      uploadedById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["labReport"]>
    composites: {}
  }

  type LabReportGetPayload<S extends boolean | null | undefined | LabReportDefaultArgs> = $Result.GetResult<Prisma.$LabReportPayload, S>

  type LabReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LabReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LabReportCountAggregateInputType | true
    }

  export interface LabReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LabReport'], meta: { name: 'LabReport' } }
    /**
     * Find zero or one LabReport that matches the filter.
     * @param {LabReportFindUniqueArgs} args - Arguments to find a LabReport
     * @example
     * // Get one LabReport
     * const labReport = await prisma.labReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LabReportFindUniqueArgs>(args: SelectSubset<T, LabReportFindUniqueArgs<ExtArgs>>): Prisma__LabReportClient<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LabReport that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LabReportFindUniqueOrThrowArgs} args - Arguments to find a LabReport
     * @example
     * // Get one LabReport
     * const labReport = await prisma.labReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LabReportFindUniqueOrThrowArgs>(args: SelectSubset<T, LabReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LabReportClient<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LabReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabReportFindFirstArgs} args - Arguments to find a LabReport
     * @example
     * // Get one LabReport
     * const labReport = await prisma.labReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LabReportFindFirstArgs>(args?: SelectSubset<T, LabReportFindFirstArgs<ExtArgs>>): Prisma__LabReportClient<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LabReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabReportFindFirstOrThrowArgs} args - Arguments to find a LabReport
     * @example
     * // Get one LabReport
     * const labReport = await prisma.labReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LabReportFindFirstOrThrowArgs>(args?: SelectSubset<T, LabReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__LabReportClient<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LabReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LabReports
     * const labReports = await prisma.labReport.findMany()
     * 
     * // Get first 10 LabReports
     * const labReports = await prisma.labReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const labReportWithIdOnly = await prisma.labReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LabReportFindManyArgs>(args?: SelectSubset<T, LabReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LabReport.
     * @param {LabReportCreateArgs} args - Arguments to create a LabReport.
     * @example
     * // Create one LabReport
     * const LabReport = await prisma.labReport.create({
     *   data: {
     *     // ... data to create a LabReport
     *   }
     * })
     * 
     */
    create<T extends LabReportCreateArgs>(args: SelectSubset<T, LabReportCreateArgs<ExtArgs>>): Prisma__LabReportClient<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LabReports.
     * @param {LabReportCreateManyArgs} args - Arguments to create many LabReports.
     * @example
     * // Create many LabReports
     * const labReport = await prisma.labReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LabReportCreateManyArgs>(args?: SelectSubset<T, LabReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LabReports and returns the data saved in the database.
     * @param {LabReportCreateManyAndReturnArgs} args - Arguments to create many LabReports.
     * @example
     * // Create many LabReports
     * const labReport = await prisma.labReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LabReports and only return the `id`
     * const labReportWithIdOnly = await prisma.labReport.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LabReportCreateManyAndReturnArgs>(args?: SelectSubset<T, LabReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LabReport.
     * @param {LabReportDeleteArgs} args - Arguments to delete one LabReport.
     * @example
     * // Delete one LabReport
     * const LabReport = await prisma.labReport.delete({
     *   where: {
     *     // ... filter to delete one LabReport
     *   }
     * })
     * 
     */
    delete<T extends LabReportDeleteArgs>(args: SelectSubset<T, LabReportDeleteArgs<ExtArgs>>): Prisma__LabReportClient<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LabReport.
     * @param {LabReportUpdateArgs} args - Arguments to update one LabReport.
     * @example
     * // Update one LabReport
     * const labReport = await prisma.labReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LabReportUpdateArgs>(args: SelectSubset<T, LabReportUpdateArgs<ExtArgs>>): Prisma__LabReportClient<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LabReports.
     * @param {LabReportDeleteManyArgs} args - Arguments to filter LabReports to delete.
     * @example
     * // Delete a few LabReports
     * const { count } = await prisma.labReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LabReportDeleteManyArgs>(args?: SelectSubset<T, LabReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LabReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LabReports
     * const labReport = await prisma.labReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LabReportUpdateManyArgs>(args: SelectSubset<T, LabReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LabReport.
     * @param {LabReportUpsertArgs} args - Arguments to update or create a LabReport.
     * @example
     * // Update or create a LabReport
     * const labReport = await prisma.labReport.upsert({
     *   create: {
     *     // ... data to create a LabReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LabReport we want to update
     *   }
     * })
     */
    upsert<T extends LabReportUpsertArgs>(args: SelectSubset<T, LabReportUpsertArgs<ExtArgs>>): Prisma__LabReportClient<$Result.GetResult<Prisma.$LabReportPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LabReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabReportCountArgs} args - Arguments to filter LabReports to count.
     * @example
     * // Count the number of LabReports
     * const count = await prisma.labReport.count({
     *   where: {
     *     // ... the filter for the LabReports we want to count
     *   }
     * })
    **/
    count<T extends LabReportCountArgs>(
      args?: Subset<T, LabReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LabReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LabReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LabReportAggregateArgs>(args: Subset<T, LabReportAggregateArgs>): Prisma.PrismaPromise<GetLabReportAggregateType<T>>

    /**
     * Group by LabReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabReportGroupByArgs} args - Group by arguments.
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
      T extends LabReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LabReportGroupByArgs['orderBy'] }
        : { orderBy?: LabReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LabReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLabReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LabReport model
   */
  readonly fields: LabReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LabReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LabReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    doctor<T extends LabReport$doctorArgs<ExtArgs> = {}>(args?: Subset<T, LabReport$doctorArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    uploadedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LabReport model
   */ 
  interface LabReportFieldRefs {
    readonly id: FieldRef<"LabReport", 'String'>
    readonly patientId: FieldRef<"LabReport", 'String'>
    readonly testName: FieldRef<"LabReport", 'String'>
    readonly testType: FieldRef<"LabReport", 'String'>
    readonly reportDate: FieldRef<"LabReport", 'DateTime'>
    readonly doctorId: FieldRef<"LabReport", 'String'>
    readonly results: FieldRef<"LabReport", 'Json'>
    readonly conclusion: FieldRef<"LabReport", 'String'>
    readonly recommendations: FieldRef<"LabReport", 'String'>
    readonly reportFile: FieldRef<"LabReport", 'String'>
    readonly uploadedById: FieldRef<"LabReport", 'String'>
    readonly createdAt: FieldRef<"LabReport", 'DateTime'>
    readonly updatedAt: FieldRef<"LabReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LabReport findUnique
   */
  export type LabReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    /**
     * Filter, which LabReport to fetch.
     */
    where: LabReportWhereUniqueInput
  }

  /**
   * LabReport findUniqueOrThrow
   */
  export type LabReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    /**
     * Filter, which LabReport to fetch.
     */
    where: LabReportWhereUniqueInput
  }

  /**
   * LabReport findFirst
   */
  export type LabReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    /**
     * Filter, which LabReport to fetch.
     */
    where?: LabReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LabReports to fetch.
     */
    orderBy?: LabReportOrderByWithRelationInput | LabReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LabReports.
     */
    cursor?: LabReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LabReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LabReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LabReports.
     */
    distinct?: LabReportScalarFieldEnum | LabReportScalarFieldEnum[]
  }

  /**
   * LabReport findFirstOrThrow
   */
  export type LabReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    /**
     * Filter, which LabReport to fetch.
     */
    where?: LabReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LabReports to fetch.
     */
    orderBy?: LabReportOrderByWithRelationInput | LabReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LabReports.
     */
    cursor?: LabReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LabReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LabReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LabReports.
     */
    distinct?: LabReportScalarFieldEnum | LabReportScalarFieldEnum[]
  }

  /**
   * LabReport findMany
   */
  export type LabReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    /**
     * Filter, which LabReports to fetch.
     */
    where?: LabReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LabReports to fetch.
     */
    orderBy?: LabReportOrderByWithRelationInput | LabReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LabReports.
     */
    cursor?: LabReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LabReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LabReports.
     */
    skip?: number
    distinct?: LabReportScalarFieldEnum | LabReportScalarFieldEnum[]
  }

  /**
   * LabReport create
   */
  export type LabReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    /**
     * The data needed to create a LabReport.
     */
    data: XOR<LabReportCreateInput, LabReportUncheckedCreateInput>
  }

  /**
   * LabReport createMany
   */
  export type LabReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LabReports.
     */
    data: LabReportCreateManyInput | LabReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LabReport createManyAndReturn
   */
  export type LabReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LabReports.
     */
    data: LabReportCreateManyInput | LabReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LabReport update
   */
  export type LabReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    /**
     * The data needed to update a LabReport.
     */
    data: XOR<LabReportUpdateInput, LabReportUncheckedUpdateInput>
    /**
     * Choose, which LabReport to update.
     */
    where: LabReportWhereUniqueInput
  }

  /**
   * LabReport updateMany
   */
  export type LabReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LabReports.
     */
    data: XOR<LabReportUpdateManyMutationInput, LabReportUncheckedUpdateManyInput>
    /**
     * Filter which LabReports to update
     */
    where?: LabReportWhereInput
  }

  /**
   * LabReport upsert
   */
  export type LabReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    /**
     * The filter to search for the LabReport to update in case it exists.
     */
    where: LabReportWhereUniqueInput
    /**
     * In case the LabReport found by the `where` argument doesn't exist, create a new LabReport with this data.
     */
    create: XOR<LabReportCreateInput, LabReportUncheckedCreateInput>
    /**
     * In case the LabReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LabReportUpdateInput, LabReportUncheckedUpdateInput>
  }

  /**
   * LabReport delete
   */
  export type LabReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
    /**
     * Filter which LabReport to delete.
     */
    where: LabReportWhereUniqueInput
  }

  /**
   * LabReport deleteMany
   */
  export type LabReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LabReports to delete
     */
    where?: LabReportWhereInput
  }

  /**
   * LabReport.doctor
   */
  export type LabReport$doctorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    where?: DoctorWhereInput
  }

  /**
   * LabReport without action
   */
  export type LabReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabReport
     */
    select?: LabReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabReportInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    performedById: string | null
    targetUserId: string | null
    details: string | null
    severity: string | null
    ipAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    performedById: string | null
    targetUserId: string | null
    details: string | null
    severity: string | null
    ipAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    performedById: number
    targetUserId: number
    details: number
    severity: number
    ipAddress: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    performedById?: true
    targetUserId?: true
    details?: true
    severity?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    performedById?: true
    targetUserId?: true
    details?: true
    severity?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    performedById?: true
    targetUserId?: true
    details?: true
    severity?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string
    performedById: string
    targetUserId: string | null
    details: string
    severity: string
    ipAddress: string
    createdAt: Date
    updatedAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    performedById?: boolean
    targetUserId?: boolean
    details?: boolean
    severity?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    performedBy?: boolean | UserDefaultArgs<ExtArgs>
    targetUser?: boolean | AuditLog$targetUserArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    performedById?: boolean
    targetUserId?: boolean
    details?: boolean
    severity?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    performedBy?: boolean | UserDefaultArgs<ExtArgs>
    targetUser?: boolean | AuditLog$targetUserArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    performedById?: boolean
    targetUserId?: boolean
    details?: boolean
    severity?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    performedBy?: boolean | UserDefaultArgs<ExtArgs>
    targetUser?: boolean | AuditLog$targetUserArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    performedBy?: boolean | UserDefaultArgs<ExtArgs>
    targetUser?: boolean | AuditLog$targetUserArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      performedBy: Prisma.$UserPayload<ExtArgs>
      targetUser: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      performedById: string
      targetUserId: string | null
      details: string
      severity: string
      ipAddress: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    performedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    targetUser<T extends AuditLog$targetUserArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$targetUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly performedById: FieldRef<"AuditLog", 'String'>
    readonly targetUserId: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly severity: FieldRef<"AuditLog", 'String'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
    readonly updatedAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.targetUser
   */
  export type AuditLog$targetUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model BedCapacity
   */

  export type AggregateBedCapacity = {
    _count: BedCapacityCountAggregateOutputType | null
    _avg: BedCapacityAvgAggregateOutputType | null
    _sum: BedCapacitySumAggregateOutputType | null
    _min: BedCapacityMinAggregateOutputType | null
    _max: BedCapacityMaxAggregateOutputType | null
  }

  export type BedCapacityAvgAggregateOutputType = {
    totalBeds: number | null
    occupiedBeds: number | null
    icuBeds: number | null
    occupiedIcuBeds: number | null
  }

  export type BedCapacitySumAggregateOutputType = {
    totalBeds: number | null
    occupiedBeds: number | null
    icuBeds: number | null
    occupiedIcuBeds: number | null
  }

  export type BedCapacityMinAggregateOutputType = {
    id: string | null
    department: string | null
    totalBeds: number | null
    occupiedBeds: number | null
    icuBeds: number | null
    occupiedIcuBeds: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BedCapacityMaxAggregateOutputType = {
    id: string | null
    department: string | null
    totalBeds: number | null
    occupiedBeds: number | null
    icuBeds: number | null
    occupiedIcuBeds: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BedCapacityCountAggregateOutputType = {
    id: number
    department: number
    totalBeds: number
    occupiedBeds: number
    icuBeds: number
    occupiedIcuBeds: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BedCapacityAvgAggregateInputType = {
    totalBeds?: true
    occupiedBeds?: true
    icuBeds?: true
    occupiedIcuBeds?: true
  }

  export type BedCapacitySumAggregateInputType = {
    totalBeds?: true
    occupiedBeds?: true
    icuBeds?: true
    occupiedIcuBeds?: true
  }

  export type BedCapacityMinAggregateInputType = {
    id?: true
    department?: true
    totalBeds?: true
    occupiedBeds?: true
    icuBeds?: true
    occupiedIcuBeds?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BedCapacityMaxAggregateInputType = {
    id?: true
    department?: true
    totalBeds?: true
    occupiedBeds?: true
    icuBeds?: true
    occupiedIcuBeds?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BedCapacityCountAggregateInputType = {
    id?: true
    department?: true
    totalBeds?: true
    occupiedBeds?: true
    icuBeds?: true
    occupiedIcuBeds?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BedCapacityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BedCapacity to aggregate.
     */
    where?: BedCapacityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BedCapacities to fetch.
     */
    orderBy?: BedCapacityOrderByWithRelationInput | BedCapacityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BedCapacityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BedCapacities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BedCapacities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BedCapacities
    **/
    _count?: true | BedCapacityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BedCapacityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BedCapacitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BedCapacityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BedCapacityMaxAggregateInputType
  }

  export type GetBedCapacityAggregateType<T extends BedCapacityAggregateArgs> = {
        [P in keyof T & keyof AggregateBedCapacity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBedCapacity[P]>
      : GetScalarType<T[P], AggregateBedCapacity[P]>
  }




  export type BedCapacityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BedCapacityWhereInput
    orderBy?: BedCapacityOrderByWithAggregationInput | BedCapacityOrderByWithAggregationInput[]
    by: BedCapacityScalarFieldEnum[] | BedCapacityScalarFieldEnum
    having?: BedCapacityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BedCapacityCountAggregateInputType | true
    _avg?: BedCapacityAvgAggregateInputType
    _sum?: BedCapacitySumAggregateInputType
    _min?: BedCapacityMinAggregateInputType
    _max?: BedCapacityMaxAggregateInputType
  }

  export type BedCapacityGroupByOutputType = {
    id: string
    department: string
    totalBeds: number
    occupiedBeds: number
    icuBeds: number
    occupiedIcuBeds: number
    createdAt: Date
    updatedAt: Date
    _count: BedCapacityCountAggregateOutputType | null
    _avg: BedCapacityAvgAggregateOutputType | null
    _sum: BedCapacitySumAggregateOutputType | null
    _min: BedCapacityMinAggregateOutputType | null
    _max: BedCapacityMaxAggregateOutputType | null
  }

  type GetBedCapacityGroupByPayload<T extends BedCapacityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BedCapacityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BedCapacityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BedCapacityGroupByOutputType[P]>
            : GetScalarType<T[P], BedCapacityGroupByOutputType[P]>
        }
      >
    >


  export type BedCapacitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    department?: boolean
    totalBeds?: boolean
    occupiedBeds?: boolean
    icuBeds?: boolean
    occupiedIcuBeds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bedCapacity"]>

  export type BedCapacitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    department?: boolean
    totalBeds?: boolean
    occupiedBeds?: boolean
    icuBeds?: boolean
    occupiedIcuBeds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bedCapacity"]>

  export type BedCapacitySelectScalar = {
    id?: boolean
    department?: boolean
    totalBeds?: boolean
    occupiedBeds?: boolean
    icuBeds?: boolean
    occupiedIcuBeds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $BedCapacityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BedCapacity"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      department: string
      totalBeds: number
      occupiedBeds: number
      icuBeds: number
      occupiedIcuBeds: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bedCapacity"]>
    composites: {}
  }

  type BedCapacityGetPayload<S extends boolean | null | undefined | BedCapacityDefaultArgs> = $Result.GetResult<Prisma.$BedCapacityPayload, S>

  type BedCapacityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BedCapacityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BedCapacityCountAggregateInputType | true
    }

  export interface BedCapacityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BedCapacity'], meta: { name: 'BedCapacity' } }
    /**
     * Find zero or one BedCapacity that matches the filter.
     * @param {BedCapacityFindUniqueArgs} args - Arguments to find a BedCapacity
     * @example
     * // Get one BedCapacity
     * const bedCapacity = await prisma.bedCapacity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BedCapacityFindUniqueArgs>(args: SelectSubset<T, BedCapacityFindUniqueArgs<ExtArgs>>): Prisma__BedCapacityClient<$Result.GetResult<Prisma.$BedCapacityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BedCapacity that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BedCapacityFindUniqueOrThrowArgs} args - Arguments to find a BedCapacity
     * @example
     * // Get one BedCapacity
     * const bedCapacity = await prisma.bedCapacity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BedCapacityFindUniqueOrThrowArgs>(args: SelectSubset<T, BedCapacityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BedCapacityClient<$Result.GetResult<Prisma.$BedCapacityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BedCapacity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedCapacityFindFirstArgs} args - Arguments to find a BedCapacity
     * @example
     * // Get one BedCapacity
     * const bedCapacity = await prisma.bedCapacity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BedCapacityFindFirstArgs>(args?: SelectSubset<T, BedCapacityFindFirstArgs<ExtArgs>>): Prisma__BedCapacityClient<$Result.GetResult<Prisma.$BedCapacityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BedCapacity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedCapacityFindFirstOrThrowArgs} args - Arguments to find a BedCapacity
     * @example
     * // Get one BedCapacity
     * const bedCapacity = await prisma.bedCapacity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BedCapacityFindFirstOrThrowArgs>(args?: SelectSubset<T, BedCapacityFindFirstOrThrowArgs<ExtArgs>>): Prisma__BedCapacityClient<$Result.GetResult<Prisma.$BedCapacityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BedCapacities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedCapacityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BedCapacities
     * const bedCapacities = await prisma.bedCapacity.findMany()
     * 
     * // Get first 10 BedCapacities
     * const bedCapacities = await prisma.bedCapacity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bedCapacityWithIdOnly = await prisma.bedCapacity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BedCapacityFindManyArgs>(args?: SelectSubset<T, BedCapacityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BedCapacityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BedCapacity.
     * @param {BedCapacityCreateArgs} args - Arguments to create a BedCapacity.
     * @example
     * // Create one BedCapacity
     * const BedCapacity = await prisma.bedCapacity.create({
     *   data: {
     *     // ... data to create a BedCapacity
     *   }
     * })
     * 
     */
    create<T extends BedCapacityCreateArgs>(args: SelectSubset<T, BedCapacityCreateArgs<ExtArgs>>): Prisma__BedCapacityClient<$Result.GetResult<Prisma.$BedCapacityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BedCapacities.
     * @param {BedCapacityCreateManyArgs} args - Arguments to create many BedCapacities.
     * @example
     * // Create many BedCapacities
     * const bedCapacity = await prisma.bedCapacity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BedCapacityCreateManyArgs>(args?: SelectSubset<T, BedCapacityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BedCapacities and returns the data saved in the database.
     * @param {BedCapacityCreateManyAndReturnArgs} args - Arguments to create many BedCapacities.
     * @example
     * // Create many BedCapacities
     * const bedCapacity = await prisma.bedCapacity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BedCapacities and only return the `id`
     * const bedCapacityWithIdOnly = await prisma.bedCapacity.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BedCapacityCreateManyAndReturnArgs>(args?: SelectSubset<T, BedCapacityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BedCapacityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BedCapacity.
     * @param {BedCapacityDeleteArgs} args - Arguments to delete one BedCapacity.
     * @example
     * // Delete one BedCapacity
     * const BedCapacity = await prisma.bedCapacity.delete({
     *   where: {
     *     // ... filter to delete one BedCapacity
     *   }
     * })
     * 
     */
    delete<T extends BedCapacityDeleteArgs>(args: SelectSubset<T, BedCapacityDeleteArgs<ExtArgs>>): Prisma__BedCapacityClient<$Result.GetResult<Prisma.$BedCapacityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BedCapacity.
     * @param {BedCapacityUpdateArgs} args - Arguments to update one BedCapacity.
     * @example
     * // Update one BedCapacity
     * const bedCapacity = await prisma.bedCapacity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BedCapacityUpdateArgs>(args: SelectSubset<T, BedCapacityUpdateArgs<ExtArgs>>): Prisma__BedCapacityClient<$Result.GetResult<Prisma.$BedCapacityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BedCapacities.
     * @param {BedCapacityDeleteManyArgs} args - Arguments to filter BedCapacities to delete.
     * @example
     * // Delete a few BedCapacities
     * const { count } = await prisma.bedCapacity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BedCapacityDeleteManyArgs>(args?: SelectSubset<T, BedCapacityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BedCapacities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedCapacityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BedCapacities
     * const bedCapacity = await prisma.bedCapacity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BedCapacityUpdateManyArgs>(args: SelectSubset<T, BedCapacityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BedCapacity.
     * @param {BedCapacityUpsertArgs} args - Arguments to update or create a BedCapacity.
     * @example
     * // Update or create a BedCapacity
     * const bedCapacity = await prisma.bedCapacity.upsert({
     *   create: {
     *     // ... data to create a BedCapacity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BedCapacity we want to update
     *   }
     * })
     */
    upsert<T extends BedCapacityUpsertArgs>(args: SelectSubset<T, BedCapacityUpsertArgs<ExtArgs>>): Prisma__BedCapacityClient<$Result.GetResult<Prisma.$BedCapacityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BedCapacities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedCapacityCountArgs} args - Arguments to filter BedCapacities to count.
     * @example
     * // Count the number of BedCapacities
     * const count = await prisma.bedCapacity.count({
     *   where: {
     *     // ... the filter for the BedCapacities we want to count
     *   }
     * })
    **/
    count<T extends BedCapacityCountArgs>(
      args?: Subset<T, BedCapacityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BedCapacityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BedCapacity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedCapacityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BedCapacityAggregateArgs>(args: Subset<T, BedCapacityAggregateArgs>): Prisma.PrismaPromise<GetBedCapacityAggregateType<T>>

    /**
     * Group by BedCapacity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedCapacityGroupByArgs} args - Group by arguments.
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
      T extends BedCapacityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BedCapacityGroupByArgs['orderBy'] }
        : { orderBy?: BedCapacityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BedCapacityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBedCapacityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BedCapacity model
   */
  readonly fields: BedCapacityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BedCapacity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BedCapacityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BedCapacity model
   */ 
  interface BedCapacityFieldRefs {
    readonly id: FieldRef<"BedCapacity", 'String'>
    readonly department: FieldRef<"BedCapacity", 'String'>
    readonly totalBeds: FieldRef<"BedCapacity", 'Int'>
    readonly occupiedBeds: FieldRef<"BedCapacity", 'Int'>
    readonly icuBeds: FieldRef<"BedCapacity", 'Int'>
    readonly occupiedIcuBeds: FieldRef<"BedCapacity", 'Int'>
    readonly createdAt: FieldRef<"BedCapacity", 'DateTime'>
    readonly updatedAt: FieldRef<"BedCapacity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BedCapacity findUnique
   */
  export type BedCapacityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelect<ExtArgs> | null
    /**
     * Filter, which BedCapacity to fetch.
     */
    where: BedCapacityWhereUniqueInput
  }

  /**
   * BedCapacity findUniqueOrThrow
   */
  export type BedCapacityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelect<ExtArgs> | null
    /**
     * Filter, which BedCapacity to fetch.
     */
    where: BedCapacityWhereUniqueInput
  }

  /**
   * BedCapacity findFirst
   */
  export type BedCapacityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelect<ExtArgs> | null
    /**
     * Filter, which BedCapacity to fetch.
     */
    where?: BedCapacityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BedCapacities to fetch.
     */
    orderBy?: BedCapacityOrderByWithRelationInput | BedCapacityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BedCapacities.
     */
    cursor?: BedCapacityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BedCapacities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BedCapacities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BedCapacities.
     */
    distinct?: BedCapacityScalarFieldEnum | BedCapacityScalarFieldEnum[]
  }

  /**
   * BedCapacity findFirstOrThrow
   */
  export type BedCapacityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelect<ExtArgs> | null
    /**
     * Filter, which BedCapacity to fetch.
     */
    where?: BedCapacityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BedCapacities to fetch.
     */
    orderBy?: BedCapacityOrderByWithRelationInput | BedCapacityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BedCapacities.
     */
    cursor?: BedCapacityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BedCapacities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BedCapacities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BedCapacities.
     */
    distinct?: BedCapacityScalarFieldEnum | BedCapacityScalarFieldEnum[]
  }

  /**
   * BedCapacity findMany
   */
  export type BedCapacityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelect<ExtArgs> | null
    /**
     * Filter, which BedCapacities to fetch.
     */
    where?: BedCapacityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BedCapacities to fetch.
     */
    orderBy?: BedCapacityOrderByWithRelationInput | BedCapacityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BedCapacities.
     */
    cursor?: BedCapacityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BedCapacities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BedCapacities.
     */
    skip?: number
    distinct?: BedCapacityScalarFieldEnum | BedCapacityScalarFieldEnum[]
  }

  /**
   * BedCapacity create
   */
  export type BedCapacityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelect<ExtArgs> | null
    /**
     * The data needed to create a BedCapacity.
     */
    data: XOR<BedCapacityCreateInput, BedCapacityUncheckedCreateInput>
  }

  /**
   * BedCapacity createMany
   */
  export type BedCapacityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BedCapacities.
     */
    data: BedCapacityCreateManyInput | BedCapacityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BedCapacity createManyAndReturn
   */
  export type BedCapacityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BedCapacities.
     */
    data: BedCapacityCreateManyInput | BedCapacityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BedCapacity update
   */
  export type BedCapacityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelect<ExtArgs> | null
    /**
     * The data needed to update a BedCapacity.
     */
    data: XOR<BedCapacityUpdateInput, BedCapacityUncheckedUpdateInput>
    /**
     * Choose, which BedCapacity to update.
     */
    where: BedCapacityWhereUniqueInput
  }

  /**
   * BedCapacity updateMany
   */
  export type BedCapacityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BedCapacities.
     */
    data: XOR<BedCapacityUpdateManyMutationInput, BedCapacityUncheckedUpdateManyInput>
    /**
     * Filter which BedCapacities to update
     */
    where?: BedCapacityWhereInput
  }

  /**
   * BedCapacity upsert
   */
  export type BedCapacityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelect<ExtArgs> | null
    /**
     * The filter to search for the BedCapacity to update in case it exists.
     */
    where: BedCapacityWhereUniqueInput
    /**
     * In case the BedCapacity found by the `where` argument doesn't exist, create a new BedCapacity with this data.
     */
    create: XOR<BedCapacityCreateInput, BedCapacityUncheckedCreateInput>
    /**
     * In case the BedCapacity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BedCapacityUpdateInput, BedCapacityUncheckedUpdateInput>
  }

  /**
   * BedCapacity delete
   */
  export type BedCapacityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelect<ExtArgs> | null
    /**
     * Filter which BedCapacity to delete.
     */
    where: BedCapacityWhereUniqueInput
  }

  /**
   * BedCapacity deleteMany
   */
  export type BedCapacityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BedCapacities to delete
     */
    where?: BedCapacityWhereInput
  }

  /**
   * BedCapacity without action
   */
  export type BedCapacityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedCapacity
     */
    select?: BedCapacitySelect<ExtArgs> | null
  }


  /**
   * Model ContactMessage
   */

  export type AggregateContactMessage = {
    _count: ContactMessageCountAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  export type ContactMessageMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    facility: string | null
    role: string | null
    phone: string | null
    message: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactMessageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    facility: string | null
    role: string | null
    phone: string | null
    message: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactMessageCountAggregateOutputType = {
    id: number
    name: number
    email: number
    facility: number
    role: number
    phone: number
    message: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContactMessageMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    facility?: true
    role?: true
    phone?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactMessageMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    facility?: true
    role?: true
    phone?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactMessageCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    facility?: true
    role?: true
    phone?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContactMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessage to aggregate.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactMessages
    **/
    _count?: true | ContactMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMessageMaxAggregateInputType
  }

  export type GetContactMessageAggregateType<T extends ContactMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateContactMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactMessage[P]>
      : GetScalarType<T[P], AggregateContactMessage[P]>
  }




  export type ContactMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactMessageWhereInput
    orderBy?: ContactMessageOrderByWithAggregationInput | ContactMessageOrderByWithAggregationInput[]
    by: ContactMessageScalarFieldEnum[] | ContactMessageScalarFieldEnum
    having?: ContactMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactMessageCountAggregateInputType | true
    _min?: ContactMessageMinAggregateInputType
    _max?: ContactMessageMaxAggregateInputType
  }

  export type ContactMessageGroupByOutputType = {
    id: string
    name: string
    email: string
    facility: string
    role: string
    phone: string | null
    message: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ContactMessageCountAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  type GetContactMessageGroupByPayload<T extends ContactMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
        }
      >
    >


  export type ContactMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    facility?: boolean
    role?: boolean
    phone?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contactMessage"]>

  export type ContactMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    facility?: boolean
    role?: boolean
    phone?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contactMessage"]>

  export type ContactMessageSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    facility?: boolean
    role?: boolean
    phone?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ContactMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      facility: string
      role: string
      phone: string | null
      message: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contactMessage"]>
    composites: {}
  }

  type ContactMessageGetPayload<S extends boolean | null | undefined | ContactMessageDefaultArgs> = $Result.GetResult<Prisma.$ContactMessagePayload, S>

  type ContactMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContactMessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContactMessageCountAggregateInputType | true
    }

  export interface ContactMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactMessage'], meta: { name: 'ContactMessage' } }
    /**
     * Find zero or one ContactMessage that matches the filter.
     * @param {ContactMessageFindUniqueArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactMessageFindUniqueArgs>(args: SelectSubset<T, ContactMessageFindUniqueArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ContactMessage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContactMessageFindUniqueOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ContactMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactMessageFindFirstArgs>(args?: SelectSubset<T, ContactMessageFindFirstArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ContactMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ContactMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany()
     * 
     * // Get first 10 ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactMessageWithIdOnly = await prisma.contactMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactMessageFindManyArgs>(args?: SelectSubset<T, ContactMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ContactMessage.
     * @param {ContactMessageCreateArgs} args - Arguments to create a ContactMessage.
     * @example
     * // Create one ContactMessage
     * const ContactMessage = await prisma.contactMessage.create({
     *   data: {
     *     // ... data to create a ContactMessage
     *   }
     * })
     * 
     */
    create<T extends ContactMessageCreateArgs>(args: SelectSubset<T, ContactMessageCreateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ContactMessages.
     * @param {ContactMessageCreateManyArgs} args - Arguments to create many ContactMessages.
     * @example
     * // Create many ContactMessages
     * const contactMessage = await prisma.contactMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactMessageCreateManyArgs>(args?: SelectSubset<T, ContactMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContactMessages and returns the data saved in the database.
     * @param {ContactMessageCreateManyAndReturnArgs} args - Arguments to create many ContactMessages.
     * @example
     * // Create many ContactMessages
     * const contactMessage = await prisma.contactMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContactMessages and only return the `id`
     * const contactMessageWithIdOnly = await prisma.contactMessage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ContactMessage.
     * @param {ContactMessageDeleteArgs} args - Arguments to delete one ContactMessage.
     * @example
     * // Delete one ContactMessage
     * const ContactMessage = await prisma.contactMessage.delete({
     *   where: {
     *     // ... filter to delete one ContactMessage
     *   }
     * })
     * 
     */
    delete<T extends ContactMessageDeleteArgs>(args: SelectSubset<T, ContactMessageDeleteArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ContactMessage.
     * @param {ContactMessageUpdateArgs} args - Arguments to update one ContactMessage.
     * @example
     * // Update one ContactMessage
     * const contactMessage = await prisma.contactMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactMessageUpdateArgs>(args: SelectSubset<T, ContactMessageUpdateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ContactMessages.
     * @param {ContactMessageDeleteManyArgs} args - Arguments to filter ContactMessages to delete.
     * @example
     * // Delete a few ContactMessages
     * const { count } = await prisma.contactMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactMessageDeleteManyArgs>(args?: SelectSubset<T, ContactMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactMessages
     * const contactMessage = await prisma.contactMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactMessageUpdateManyArgs>(args: SelectSubset<T, ContactMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContactMessage.
     * @param {ContactMessageUpsertArgs} args - Arguments to update or create a ContactMessage.
     * @example
     * // Update or create a ContactMessage
     * const contactMessage = await prisma.contactMessage.upsert({
     *   create: {
     *     // ... data to create a ContactMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactMessage we want to update
     *   }
     * })
     */
    upsert<T extends ContactMessageUpsertArgs>(args: SelectSubset<T, ContactMessageUpsertArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageCountArgs} args - Arguments to filter ContactMessages to count.
     * @example
     * // Count the number of ContactMessages
     * const count = await prisma.contactMessage.count({
     *   where: {
     *     // ... the filter for the ContactMessages we want to count
     *   }
     * })
    **/
    count<T extends ContactMessageCountArgs>(
      args?: Subset<T, ContactMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactMessageAggregateArgs>(args: Subset<T, ContactMessageAggregateArgs>): Prisma.PrismaPromise<GetContactMessageAggregateType<T>>

    /**
     * Group by ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageGroupByArgs} args - Group by arguments.
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
      T extends ContactMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactMessageGroupByArgs['orderBy'] }
        : { orderBy?: ContactMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactMessage model
   */
  readonly fields: ContactMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactMessage model
   */ 
  interface ContactMessageFieldRefs {
    readonly id: FieldRef<"ContactMessage", 'String'>
    readonly name: FieldRef<"ContactMessage", 'String'>
    readonly email: FieldRef<"ContactMessage", 'String'>
    readonly facility: FieldRef<"ContactMessage", 'String'>
    readonly role: FieldRef<"ContactMessage", 'String'>
    readonly phone: FieldRef<"ContactMessage", 'String'>
    readonly message: FieldRef<"ContactMessage", 'String'>
    readonly status: FieldRef<"ContactMessage", 'String'>
    readonly createdAt: FieldRef<"ContactMessage", 'DateTime'>
    readonly updatedAt: FieldRef<"ContactMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContactMessage findUnique
   */
  export type ContactMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findUniqueOrThrow
   */
  export type ContactMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findFirst
   */
  export type ContactMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findFirstOrThrow
   */
  export type ContactMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findMany
   */
  export type ContactMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Filter, which ContactMessages to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage create
   */
  export type ContactMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * The data needed to create a ContactMessage.
     */
    data: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
  }

  /**
   * ContactMessage createMany
   */
  export type ContactMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactMessages.
     */
    data: ContactMessageCreateManyInput | ContactMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactMessage createManyAndReturn
   */
  export type ContactMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ContactMessages.
     */
    data: ContactMessageCreateManyInput | ContactMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactMessage update
   */
  export type ContactMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * The data needed to update a ContactMessage.
     */
    data: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
    /**
     * Choose, which ContactMessage to update.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage updateMany
   */
  export type ContactMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactMessages.
     */
    data: XOR<ContactMessageUpdateManyMutationInput, ContactMessageUncheckedUpdateManyInput>
    /**
     * Filter which ContactMessages to update
     */
    where?: ContactMessageWhereInput
  }

  /**
   * ContactMessage upsert
   */
  export type ContactMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * The filter to search for the ContactMessage to update in case it exists.
     */
    where: ContactMessageWhereUniqueInput
    /**
     * In case the ContactMessage found by the `where` argument doesn't exist, create a new ContactMessage with this data.
     */
    create: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
    /**
     * In case the ContactMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
  }

  /**
   * ContactMessage delete
   */
  export type ContactMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Filter which ContactMessage to delete.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage deleteMany
   */
  export type ContactMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessages to delete
     */
    where?: ContactMessageWhereInput
  }

  /**
   * ContactMessage without action
   */
  export type ContactMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    profile: 'profile',
    isActive: 'isActive',
    isOffboarded: 'isOffboarded',
    offboardedAt: 'offboardedAt',
    offboardedById: 'offboardedById',
    lastLogin: 'lastLogin',
    refreshToken: 'refreshToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DoctorScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    specialization: 'specialization',
    qualifications: 'qualifications',
    experience: 'experience',
    licenseNumber: 'licenseNumber',
    consultationFee: 'consultationFee',
    availability: 'availability',
    isAvailable: 'isAvailable',
    dutyStatus: 'dutyStatus',
    rating: 'rating',
    department: 'department',
    leaves: 'leaves',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DoctorScalarFieldEnum = (typeof DoctorScalarFieldEnum)[keyof typeof DoctorScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    medicalRecordNumber: 'medicalRecordNumber',
    medicalHistory: 'medicalHistory',
    allergies: 'allergies',
    medications: 'medications',
    emergencyContact: 'emergencyContact',
    bloodGroup: 'bloodGroup',
    insuranceInfo: 'insuranceInfo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    doctorId: 'doctorId',
    date: 'date',
    timeSlot: 'timeSlot',
    status: 'status',
    paymentMode: 'paymentMode',
    paymentStatus: 'paymentStatus',
    paymentDetails: 'paymentDetails',
    consultationType: 'consultationType',
    symptoms: 'symptoms',
    notes: 'notes',
    patientDocuments: 'patientDocuments',
    prescriptionId: 'prescriptionId',
    cancellationReason: 'cancellationReason',
    cancelledById: 'cancelledById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const TriageRecordScalarFieldEnum: {
    id: 'id',
    patientName: 'patientName',
    age: 'age',
    gender: 'gender',
    contactNumber: 'contactNumber',
    symptoms: 'symptoms',
    vitals: 'vitals',
    aiAnalysis: 'aiAnalysis',
    receptionistId: 'receptionistId',
    doctorReferredId: 'doctorReferredId',
    patientId: 'patientId',
    status: 'status',
    diagnosis: 'diagnosis',
    prescribedMedicines: 'prescribedMedicines',
    tests: 'tests',
    advice: 'advice',
    followUpDate: 'followUpDate',
    triageId: 'triageId',
    checkedInAt: 'checkedInAt',
    checkedOutAt: 'checkedOutAt',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TriageRecordScalarFieldEnum = (typeof TriageRecordScalarFieldEnum)[keyof typeof TriageRecordScalarFieldEnum]


  export const BillScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    triageId: 'triageId',
    appointmentId: 'appointmentId',
    items: 'items',
    subtotal: 'subtotal',
    tax: 'tax',
    total: 'total',
    status: 'status',
    dueDate: 'dueDate',
    paymentMethod: 'paymentMethod',
    paymentDetails: 'paymentDetails',
    receipt: 'receipt',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BillScalarFieldEnum = (typeof BillScalarFieldEnum)[keyof typeof BillScalarFieldEnum]


  export const PrescriptionScalarFieldEnum: {
    id: 'id',
    appointmentId: 'appointmentId',
    patientId: 'patientId',
    doctorId: 'doctorId',
    diagnosis: 'diagnosis',
    medicines: 'medicines',
    tests: 'tests',
    advice: 'advice',
    followUpDate: 'followUpDate',
    receipt: 'receipt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrescriptionScalarFieldEnum = (typeof PrescriptionScalarFieldEnum)[keyof typeof PrescriptionScalarFieldEnum]


  export const LabReportScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    testName: 'testName',
    testType: 'testType',
    reportDate: 'reportDate',
    doctorId: 'doctorId',
    results: 'results',
    conclusion: 'conclusion',
    recommendations: 'recommendations',
    reportFile: 'reportFile',
    uploadedById: 'uploadedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LabReportScalarFieldEnum = (typeof LabReportScalarFieldEnum)[keyof typeof LabReportScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    performedById: 'performedById',
    targetUserId: 'targetUserId',
    details: 'details',
    severity: 'severity',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const BedCapacityScalarFieldEnum: {
    id: 'id',
    department: 'department',
    totalBeds: 'totalBeds',
    occupiedBeds: 'occupiedBeds',
    icuBeds: 'icuBeds',
    occupiedIcuBeds: 'occupiedIcuBeds',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BedCapacityScalarFieldEnum = (typeof BedCapacityScalarFieldEnum)[keyof typeof BedCapacityScalarFieldEnum]


  export const ContactMessageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    facility: 'facility',
    role: 'role',
    phone: 'phone',
    message: 'message',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContactMessageScalarFieldEnum = (typeof ContactMessageScalarFieldEnum)[keyof typeof ContactMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    profile?: JsonFilter<"User">
    isActive?: BoolFilter<"User"> | boolean
    isOffboarded?: BoolFilter<"User"> | boolean
    offboardedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    offboardedById?: StringNullableFilter<"User"> | string | null
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    offboardedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    offboardedUsers?: UserListRelationFilter
    doctor?: XOR<DoctorNullableRelationFilter, DoctorWhereInput> | null
    patient?: XOR<PatientNullableRelationFilter, PatientWhereInput> | null
    cancelledAppointments?: AppointmentListRelationFilter
    receptionistTriage?: TriageRecordListRelationFilter
    doctorReferredTriage?: TriageRecordListRelationFilter
    createdBills?: BillListRelationFilter
    uploadedLabReports?: LabReportListRelationFilter
    performedAuditLogs?: AuditLogListRelationFilter
    targetAuditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    profile?: SortOrder
    isActive?: SortOrder
    isOffboarded?: SortOrder
    offboardedAt?: SortOrderInput | SortOrder
    offboardedById?: SortOrderInput | SortOrder
    lastLogin?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    offboardedBy?: UserOrderByWithRelationInput
    offboardedUsers?: UserOrderByRelationAggregateInput
    doctor?: DoctorOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
    cancelledAppointments?: AppointmentOrderByRelationAggregateInput
    receptionistTriage?: TriageRecordOrderByRelationAggregateInput
    doctorReferredTriage?: TriageRecordOrderByRelationAggregateInput
    createdBills?: BillOrderByRelationAggregateInput
    uploadedLabReports?: LabReportOrderByRelationAggregateInput
    performedAuditLogs?: AuditLogOrderByRelationAggregateInput
    targetAuditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    profile?: JsonFilter<"User">
    isActive?: BoolFilter<"User"> | boolean
    isOffboarded?: BoolFilter<"User"> | boolean
    offboardedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    offboardedById?: StringNullableFilter<"User"> | string | null
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    offboardedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    offboardedUsers?: UserListRelationFilter
    doctor?: XOR<DoctorNullableRelationFilter, DoctorWhereInput> | null
    patient?: XOR<PatientNullableRelationFilter, PatientWhereInput> | null
    cancelledAppointments?: AppointmentListRelationFilter
    receptionistTriage?: TriageRecordListRelationFilter
    doctorReferredTriage?: TriageRecordListRelationFilter
    createdBills?: BillListRelationFilter
    uploadedLabReports?: LabReportListRelationFilter
    performedAuditLogs?: AuditLogListRelationFilter
    targetAuditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    profile?: SortOrder
    isActive?: SortOrder
    isOffboarded?: SortOrder
    offboardedAt?: SortOrderInput | SortOrder
    offboardedById?: SortOrderInput | SortOrder
    lastLogin?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    profile?: JsonWithAggregatesFilter<"User">
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    isOffboarded?: BoolWithAggregatesFilter<"User"> | boolean
    offboardedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    offboardedById?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DoctorWhereInput = {
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    id?: StringFilter<"Doctor"> | string
    userId?: StringFilter<"Doctor"> | string
    name?: StringFilter<"Doctor"> | string
    specialization?: StringFilter<"Doctor"> | string
    qualifications?: StringFilter<"Doctor"> | string
    experience?: IntFilter<"Doctor"> | number
    licenseNumber?: StringFilter<"Doctor"> | string
    consultationFee?: FloatFilter<"Doctor"> | number
    availability?: JsonFilter<"Doctor">
    isAvailable?: BoolFilter<"Doctor"> | boolean
    dutyStatus?: StringFilter<"Doctor"> | string
    rating?: JsonFilter<"Doctor">
    department?: StringFilter<"Doctor"> | string
    leaves?: JsonFilter<"Doctor">
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    appointments?: AppointmentListRelationFilter
    prescriptions?: PrescriptionListRelationFilter
    labReports?: LabReportListRelationFilter
  }

  export type DoctorOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    qualifications?: SortOrder
    experience?: SortOrder
    licenseNumber?: SortOrder
    consultationFee?: SortOrder
    availability?: SortOrder
    isAvailable?: SortOrder
    dutyStatus?: SortOrder
    rating?: SortOrder
    department?: SortOrder
    leaves?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
    prescriptions?: PrescriptionOrderByRelationAggregateInput
    labReports?: LabReportOrderByRelationAggregateInput
  }

  export type DoctorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    licenseNumber?: string
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    name?: StringFilter<"Doctor"> | string
    specialization?: StringFilter<"Doctor"> | string
    qualifications?: StringFilter<"Doctor"> | string
    experience?: IntFilter<"Doctor"> | number
    consultationFee?: FloatFilter<"Doctor"> | number
    availability?: JsonFilter<"Doctor">
    isAvailable?: BoolFilter<"Doctor"> | boolean
    dutyStatus?: StringFilter<"Doctor"> | string
    rating?: JsonFilter<"Doctor">
    department?: StringFilter<"Doctor"> | string
    leaves?: JsonFilter<"Doctor">
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    appointments?: AppointmentListRelationFilter
    prescriptions?: PrescriptionListRelationFilter
    labReports?: LabReportListRelationFilter
  }, "id" | "userId" | "licenseNumber">

  export type DoctorOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    qualifications?: SortOrder
    experience?: SortOrder
    licenseNumber?: SortOrder
    consultationFee?: SortOrder
    availability?: SortOrder
    isAvailable?: SortOrder
    dutyStatus?: SortOrder
    rating?: SortOrder
    department?: SortOrder
    leaves?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DoctorCountOrderByAggregateInput
    _avg?: DoctorAvgOrderByAggregateInput
    _max?: DoctorMaxOrderByAggregateInput
    _min?: DoctorMinOrderByAggregateInput
    _sum?: DoctorSumOrderByAggregateInput
  }

  export type DoctorScalarWhereWithAggregatesInput = {
    AND?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    OR?: DoctorScalarWhereWithAggregatesInput[]
    NOT?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Doctor"> | string
    userId?: StringWithAggregatesFilter<"Doctor"> | string
    name?: StringWithAggregatesFilter<"Doctor"> | string
    specialization?: StringWithAggregatesFilter<"Doctor"> | string
    qualifications?: StringWithAggregatesFilter<"Doctor"> | string
    experience?: IntWithAggregatesFilter<"Doctor"> | number
    licenseNumber?: StringWithAggregatesFilter<"Doctor"> | string
    consultationFee?: FloatWithAggregatesFilter<"Doctor"> | number
    availability?: JsonWithAggregatesFilter<"Doctor">
    isAvailable?: BoolWithAggregatesFilter<"Doctor"> | boolean
    dutyStatus?: StringWithAggregatesFilter<"Doctor"> | string
    rating?: JsonWithAggregatesFilter<"Doctor">
    department?: StringWithAggregatesFilter<"Doctor"> | string
    leaves?: JsonWithAggregatesFilter<"Doctor">
    createdAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    userId?: StringFilter<"Patient"> | string
    medicalRecordNumber?: StringFilter<"Patient"> | string
    medicalHistory?: JsonFilter<"Patient">
    allergies?: JsonFilter<"Patient">
    medications?: JsonFilter<"Patient">
    emergencyContact?: JsonFilter<"Patient">
    bloodGroup?: StringNullableFilter<"Patient"> | string | null
    insuranceInfo?: JsonNullableFilter<"Patient">
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    appointments?: AppointmentListRelationFilter
    triageRecords?: TriageRecordListRelationFilter
    bills?: BillListRelationFilter
    prescriptions?: PrescriptionListRelationFilter
    labReports?: LabReportListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    medicalRecordNumber?: SortOrder
    medicalHistory?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    emergencyContact?: SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    insuranceInfo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
    triageRecords?: TriageRecordOrderByRelationAggregateInput
    bills?: BillOrderByRelationAggregateInput
    prescriptions?: PrescriptionOrderByRelationAggregateInput
    labReports?: LabReportOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    medicalRecordNumber?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    medicalHistory?: JsonFilter<"Patient">
    allergies?: JsonFilter<"Patient">
    medications?: JsonFilter<"Patient">
    emergencyContact?: JsonFilter<"Patient">
    bloodGroup?: StringNullableFilter<"Patient"> | string | null
    insuranceInfo?: JsonNullableFilter<"Patient">
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    appointments?: AppointmentListRelationFilter
    triageRecords?: TriageRecordListRelationFilter
    bills?: BillListRelationFilter
    prescriptions?: PrescriptionListRelationFilter
    labReports?: LabReportListRelationFilter
  }, "id" | "userId" | "medicalRecordNumber">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    medicalRecordNumber?: SortOrder
    medicalHistory?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    emergencyContact?: SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    insuranceInfo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    userId?: StringWithAggregatesFilter<"Patient"> | string
    medicalRecordNumber?: StringWithAggregatesFilter<"Patient"> | string
    medicalHistory?: JsonWithAggregatesFilter<"Patient">
    allergies?: JsonWithAggregatesFilter<"Patient">
    medications?: JsonWithAggregatesFilter<"Patient">
    emergencyContact?: JsonWithAggregatesFilter<"Patient">
    bloodGroup?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    insuranceInfo?: JsonNullableWithAggregatesFilter<"Patient">
    createdAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    patientId?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    date?: DateTimeFilter<"Appointment"> | Date | string
    timeSlot?: JsonFilter<"Appointment">
    status?: StringFilter<"Appointment"> | string
    paymentMode?: StringFilter<"Appointment"> | string
    paymentStatus?: StringFilter<"Appointment"> | string
    paymentDetails?: JsonNullableFilter<"Appointment">
    consultationType?: StringFilter<"Appointment"> | string
    symptoms?: StringNullableFilter<"Appointment"> | string | null
    notes?: StringNullableFilter<"Appointment"> | string | null
    patientDocuments?: JsonNullableFilter<"Appointment">
    prescriptionId?: StringNullableFilter<"Appointment"> | string | null
    cancellationReason?: StringNullableFilter<"Appointment"> | string | null
    cancelledById?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    doctor?: XOR<DoctorRelationFilter, DoctorWhereInput>
    prescription?: XOR<PrescriptionNullableRelationFilter, PrescriptionWhereInput> | null
    cancelledBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    bills?: BillListRelationFilter
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    timeSlot?: SortOrder
    status?: SortOrder
    paymentMode?: SortOrder
    paymentStatus?: SortOrder
    paymentDetails?: SortOrderInput | SortOrder
    consultationType?: SortOrder
    symptoms?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    patientDocuments?: SortOrderInput | SortOrder
    prescriptionId?: SortOrderInput | SortOrder
    cancellationReason?: SortOrderInput | SortOrder
    cancelledById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
    doctor?: DoctorOrderByWithRelationInput
    prescription?: PrescriptionOrderByWithRelationInput
    cancelledBy?: UserOrderByWithRelationInput
    bills?: BillOrderByRelationAggregateInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    prescriptionId?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    patientId?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    date?: DateTimeFilter<"Appointment"> | Date | string
    timeSlot?: JsonFilter<"Appointment">
    status?: StringFilter<"Appointment"> | string
    paymentMode?: StringFilter<"Appointment"> | string
    paymentStatus?: StringFilter<"Appointment"> | string
    paymentDetails?: JsonNullableFilter<"Appointment">
    consultationType?: StringFilter<"Appointment"> | string
    symptoms?: StringNullableFilter<"Appointment"> | string | null
    notes?: StringNullableFilter<"Appointment"> | string | null
    patientDocuments?: JsonNullableFilter<"Appointment">
    cancellationReason?: StringNullableFilter<"Appointment"> | string | null
    cancelledById?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    doctor?: XOR<DoctorRelationFilter, DoctorWhereInput>
    prescription?: XOR<PrescriptionNullableRelationFilter, PrescriptionWhereInput> | null
    cancelledBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    bills?: BillListRelationFilter
  }, "id" | "prescriptionId">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    timeSlot?: SortOrder
    status?: SortOrder
    paymentMode?: SortOrder
    paymentStatus?: SortOrder
    paymentDetails?: SortOrderInput | SortOrder
    consultationType?: SortOrder
    symptoms?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    patientDocuments?: SortOrderInput | SortOrder
    prescriptionId?: SortOrderInput | SortOrder
    cancellationReason?: SortOrderInput | SortOrder
    cancelledById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    patientId?: StringWithAggregatesFilter<"Appointment"> | string
    doctorId?: StringWithAggregatesFilter<"Appointment"> | string
    date?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    timeSlot?: JsonWithAggregatesFilter<"Appointment">
    status?: StringWithAggregatesFilter<"Appointment"> | string
    paymentMode?: StringWithAggregatesFilter<"Appointment"> | string
    paymentStatus?: StringWithAggregatesFilter<"Appointment"> | string
    paymentDetails?: JsonNullableWithAggregatesFilter<"Appointment">
    consultationType?: StringWithAggregatesFilter<"Appointment"> | string
    symptoms?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    patientDocuments?: JsonNullableWithAggregatesFilter<"Appointment">
    prescriptionId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    cancellationReason?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    cancelledById?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type TriageRecordWhereInput = {
    AND?: TriageRecordWhereInput | TriageRecordWhereInput[]
    OR?: TriageRecordWhereInput[]
    NOT?: TriageRecordWhereInput | TriageRecordWhereInput[]
    id?: StringFilter<"TriageRecord"> | string
    patientName?: StringFilter<"TriageRecord"> | string
    age?: IntFilter<"TriageRecord"> | number
    gender?: StringFilter<"TriageRecord"> | string
    contactNumber?: StringFilter<"TriageRecord"> | string
    symptoms?: StringFilter<"TriageRecord"> | string
    vitals?: JsonNullableFilter<"TriageRecord">
    aiAnalysis?: JsonNullableFilter<"TriageRecord">
    receptionistId?: StringFilter<"TriageRecord"> | string
    doctorReferredId?: StringNullableFilter<"TriageRecord"> | string | null
    patientId?: StringNullableFilter<"TriageRecord"> | string | null
    status?: StringFilter<"TriageRecord"> | string
    diagnosis?: StringNullableFilter<"TriageRecord"> | string | null
    prescribedMedicines?: JsonNullableFilter<"TriageRecord">
    tests?: JsonNullableFilter<"TriageRecord">
    advice?: StringNullableFilter<"TriageRecord"> | string | null
    followUpDate?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    triageId?: StringFilter<"TriageRecord"> | string
    checkedInAt?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    checkedOutAt?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    createdAt?: DateTimeFilter<"TriageRecord"> | Date | string
    updatedAt?: DateTimeFilter<"TriageRecord"> | Date | string
    receptionist?: XOR<UserRelationFilter, UserWhereInput>
    doctorReferred?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    patient?: XOR<PatientNullableRelationFilter, PatientWhereInput> | null
  }

  export type TriageRecordOrderByWithRelationInput = {
    id?: SortOrder
    patientName?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    contactNumber?: SortOrder
    symptoms?: SortOrder
    vitals?: SortOrderInput | SortOrder
    aiAnalysis?: SortOrderInput | SortOrder
    receptionistId?: SortOrder
    doctorReferredId?: SortOrderInput | SortOrder
    patientId?: SortOrderInput | SortOrder
    status?: SortOrder
    diagnosis?: SortOrderInput | SortOrder
    prescribedMedicines?: SortOrderInput | SortOrder
    tests?: SortOrderInput | SortOrder
    advice?: SortOrderInput | SortOrder
    followUpDate?: SortOrderInput | SortOrder
    triageId?: SortOrder
    checkedInAt?: SortOrderInput | SortOrder
    checkedOutAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    receptionist?: UserOrderByWithRelationInput
    doctorReferred?: UserOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
  }

  export type TriageRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    triageId?: string
    AND?: TriageRecordWhereInput | TriageRecordWhereInput[]
    OR?: TriageRecordWhereInput[]
    NOT?: TriageRecordWhereInput | TriageRecordWhereInput[]
    patientName?: StringFilter<"TriageRecord"> | string
    age?: IntFilter<"TriageRecord"> | number
    gender?: StringFilter<"TriageRecord"> | string
    contactNumber?: StringFilter<"TriageRecord"> | string
    symptoms?: StringFilter<"TriageRecord"> | string
    vitals?: JsonNullableFilter<"TriageRecord">
    aiAnalysis?: JsonNullableFilter<"TriageRecord">
    receptionistId?: StringFilter<"TriageRecord"> | string
    doctorReferredId?: StringNullableFilter<"TriageRecord"> | string | null
    patientId?: StringNullableFilter<"TriageRecord"> | string | null
    status?: StringFilter<"TriageRecord"> | string
    diagnosis?: StringNullableFilter<"TriageRecord"> | string | null
    prescribedMedicines?: JsonNullableFilter<"TriageRecord">
    tests?: JsonNullableFilter<"TriageRecord">
    advice?: StringNullableFilter<"TriageRecord"> | string | null
    followUpDate?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    checkedInAt?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    checkedOutAt?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    createdAt?: DateTimeFilter<"TriageRecord"> | Date | string
    updatedAt?: DateTimeFilter<"TriageRecord"> | Date | string
    receptionist?: XOR<UserRelationFilter, UserWhereInput>
    doctorReferred?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    patient?: XOR<PatientNullableRelationFilter, PatientWhereInput> | null
  }, "id" | "triageId">

  export type TriageRecordOrderByWithAggregationInput = {
    id?: SortOrder
    patientName?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    contactNumber?: SortOrder
    symptoms?: SortOrder
    vitals?: SortOrderInput | SortOrder
    aiAnalysis?: SortOrderInput | SortOrder
    receptionistId?: SortOrder
    doctorReferredId?: SortOrderInput | SortOrder
    patientId?: SortOrderInput | SortOrder
    status?: SortOrder
    diagnosis?: SortOrderInput | SortOrder
    prescribedMedicines?: SortOrderInput | SortOrder
    tests?: SortOrderInput | SortOrder
    advice?: SortOrderInput | SortOrder
    followUpDate?: SortOrderInput | SortOrder
    triageId?: SortOrder
    checkedInAt?: SortOrderInput | SortOrder
    checkedOutAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TriageRecordCountOrderByAggregateInput
    _avg?: TriageRecordAvgOrderByAggregateInput
    _max?: TriageRecordMaxOrderByAggregateInput
    _min?: TriageRecordMinOrderByAggregateInput
    _sum?: TriageRecordSumOrderByAggregateInput
  }

  export type TriageRecordScalarWhereWithAggregatesInput = {
    AND?: TriageRecordScalarWhereWithAggregatesInput | TriageRecordScalarWhereWithAggregatesInput[]
    OR?: TriageRecordScalarWhereWithAggregatesInput[]
    NOT?: TriageRecordScalarWhereWithAggregatesInput | TriageRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TriageRecord"> | string
    patientName?: StringWithAggregatesFilter<"TriageRecord"> | string
    age?: IntWithAggregatesFilter<"TriageRecord"> | number
    gender?: StringWithAggregatesFilter<"TriageRecord"> | string
    contactNumber?: StringWithAggregatesFilter<"TriageRecord"> | string
    symptoms?: StringWithAggregatesFilter<"TriageRecord"> | string
    vitals?: JsonNullableWithAggregatesFilter<"TriageRecord">
    aiAnalysis?: JsonNullableWithAggregatesFilter<"TriageRecord">
    receptionistId?: StringWithAggregatesFilter<"TriageRecord"> | string
    doctorReferredId?: StringNullableWithAggregatesFilter<"TriageRecord"> | string | null
    patientId?: StringNullableWithAggregatesFilter<"TriageRecord"> | string | null
    status?: StringWithAggregatesFilter<"TriageRecord"> | string
    diagnosis?: StringNullableWithAggregatesFilter<"TriageRecord"> | string | null
    prescribedMedicines?: JsonNullableWithAggregatesFilter<"TriageRecord">
    tests?: JsonNullableWithAggregatesFilter<"TriageRecord">
    advice?: StringNullableWithAggregatesFilter<"TriageRecord"> | string | null
    followUpDate?: DateTimeNullableWithAggregatesFilter<"TriageRecord"> | Date | string | null
    triageId?: StringWithAggregatesFilter<"TriageRecord"> | string
    checkedInAt?: DateTimeNullableWithAggregatesFilter<"TriageRecord"> | Date | string | null
    checkedOutAt?: DateTimeNullableWithAggregatesFilter<"TriageRecord"> | Date | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"TriageRecord"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TriageRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TriageRecord"> | Date | string
  }

  export type BillWhereInput = {
    AND?: BillWhereInput | BillWhereInput[]
    OR?: BillWhereInput[]
    NOT?: BillWhereInput | BillWhereInput[]
    id?: StringFilter<"Bill"> | string
    patientId?: StringNullableFilter<"Bill"> | string | null
    triageId?: StringNullableFilter<"Bill"> | string | null
    appointmentId?: StringNullableFilter<"Bill"> | string | null
    items?: JsonFilter<"Bill">
    subtotal?: FloatFilter<"Bill"> | number
    tax?: FloatFilter<"Bill"> | number
    total?: FloatFilter<"Bill"> | number
    status?: StringFilter<"Bill"> | string
    dueDate?: DateTimeNullableFilter<"Bill"> | Date | string | null
    paymentMethod?: StringNullableFilter<"Bill"> | string | null
    paymentDetails?: JsonNullableFilter<"Bill">
    receipt?: StringNullableFilter<"Bill"> | string | null
    createdById?: StringFilter<"Bill"> | string
    createdAt?: DateTimeFilter<"Bill"> | Date | string
    updatedAt?: DateTimeFilter<"Bill"> | Date | string
    patient?: XOR<PatientNullableRelationFilter, PatientWhereInput> | null
    appointment?: XOR<AppointmentNullableRelationFilter, AppointmentWhereInput> | null
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type BillOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrderInput | SortOrder
    triageId?: SortOrderInput | SortOrder
    appointmentId?: SortOrderInput | SortOrder
    items?: SortOrder
    subtotal?: SortOrder
    tax?: SortOrder
    total?: SortOrder
    status?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paymentDetails?: SortOrderInput | SortOrder
    receipt?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
    appointment?: AppointmentOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type BillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BillWhereInput | BillWhereInput[]
    OR?: BillWhereInput[]
    NOT?: BillWhereInput | BillWhereInput[]
    patientId?: StringNullableFilter<"Bill"> | string | null
    triageId?: StringNullableFilter<"Bill"> | string | null
    appointmentId?: StringNullableFilter<"Bill"> | string | null
    items?: JsonFilter<"Bill">
    subtotal?: FloatFilter<"Bill"> | number
    tax?: FloatFilter<"Bill"> | number
    total?: FloatFilter<"Bill"> | number
    status?: StringFilter<"Bill"> | string
    dueDate?: DateTimeNullableFilter<"Bill"> | Date | string | null
    paymentMethod?: StringNullableFilter<"Bill"> | string | null
    paymentDetails?: JsonNullableFilter<"Bill">
    receipt?: StringNullableFilter<"Bill"> | string | null
    createdById?: StringFilter<"Bill"> | string
    createdAt?: DateTimeFilter<"Bill"> | Date | string
    updatedAt?: DateTimeFilter<"Bill"> | Date | string
    patient?: XOR<PatientNullableRelationFilter, PatientWhereInput> | null
    appointment?: XOR<AppointmentNullableRelationFilter, AppointmentWhereInput> | null
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type BillOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrderInput | SortOrder
    triageId?: SortOrderInput | SortOrder
    appointmentId?: SortOrderInput | SortOrder
    items?: SortOrder
    subtotal?: SortOrder
    tax?: SortOrder
    total?: SortOrder
    status?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paymentDetails?: SortOrderInput | SortOrder
    receipt?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BillCountOrderByAggregateInput
    _avg?: BillAvgOrderByAggregateInput
    _max?: BillMaxOrderByAggregateInput
    _min?: BillMinOrderByAggregateInput
    _sum?: BillSumOrderByAggregateInput
  }

  export type BillScalarWhereWithAggregatesInput = {
    AND?: BillScalarWhereWithAggregatesInput | BillScalarWhereWithAggregatesInput[]
    OR?: BillScalarWhereWithAggregatesInput[]
    NOT?: BillScalarWhereWithAggregatesInput | BillScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bill"> | string
    patientId?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    triageId?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    appointmentId?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    items?: JsonWithAggregatesFilter<"Bill">
    subtotal?: FloatWithAggregatesFilter<"Bill"> | number
    tax?: FloatWithAggregatesFilter<"Bill"> | number
    total?: FloatWithAggregatesFilter<"Bill"> | number
    status?: StringWithAggregatesFilter<"Bill"> | string
    dueDate?: DateTimeNullableWithAggregatesFilter<"Bill"> | Date | string | null
    paymentMethod?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    paymentDetails?: JsonNullableWithAggregatesFilter<"Bill">
    receipt?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    createdById?: StringWithAggregatesFilter<"Bill"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Bill"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bill"> | Date | string
  }

  export type PrescriptionWhereInput = {
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    id?: StringFilter<"Prescription"> | string
    appointmentId?: StringFilter<"Prescription"> | string
    patientId?: StringFilter<"Prescription"> | string
    doctorId?: StringFilter<"Prescription"> | string
    diagnosis?: StringFilter<"Prescription"> | string
    medicines?: JsonFilter<"Prescription">
    tests?: JsonNullableFilter<"Prescription">
    advice?: StringNullableFilter<"Prescription"> | string | null
    followUpDate?: DateTimeNullableFilter<"Prescription"> | Date | string | null
    receipt?: StringNullableFilter<"Prescription"> | string | null
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    appointment?: XOR<AppointmentNullableRelationFilter, AppointmentWhereInput> | null
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    doctor?: XOR<DoctorRelationFilter, DoctorWhereInput>
  }

  export type PrescriptionOrderByWithRelationInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    diagnosis?: SortOrder
    medicines?: SortOrder
    tests?: SortOrderInput | SortOrder
    advice?: SortOrderInput | SortOrder
    followUpDate?: SortOrderInput | SortOrder
    receipt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    appointment?: AppointmentOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
    doctor?: DoctorOrderByWithRelationInput
  }

  export type PrescriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    appointmentId?: string
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    patientId?: StringFilter<"Prescription"> | string
    doctorId?: StringFilter<"Prescription"> | string
    diagnosis?: StringFilter<"Prescription"> | string
    medicines?: JsonFilter<"Prescription">
    tests?: JsonNullableFilter<"Prescription">
    advice?: StringNullableFilter<"Prescription"> | string | null
    followUpDate?: DateTimeNullableFilter<"Prescription"> | Date | string | null
    receipt?: StringNullableFilter<"Prescription"> | string | null
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    appointment?: XOR<AppointmentNullableRelationFilter, AppointmentWhereInput> | null
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    doctor?: XOR<DoctorRelationFilter, DoctorWhereInput>
  }, "id" | "appointmentId">

  export type PrescriptionOrderByWithAggregationInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    diagnosis?: SortOrder
    medicines?: SortOrder
    tests?: SortOrderInput | SortOrder
    advice?: SortOrderInput | SortOrder
    followUpDate?: SortOrderInput | SortOrder
    receipt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrescriptionCountOrderByAggregateInput
    _max?: PrescriptionMaxOrderByAggregateInput
    _min?: PrescriptionMinOrderByAggregateInput
  }

  export type PrescriptionScalarWhereWithAggregatesInput = {
    AND?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    OR?: PrescriptionScalarWhereWithAggregatesInput[]
    NOT?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Prescription"> | string
    appointmentId?: StringWithAggregatesFilter<"Prescription"> | string
    patientId?: StringWithAggregatesFilter<"Prescription"> | string
    doctorId?: StringWithAggregatesFilter<"Prescription"> | string
    diagnosis?: StringWithAggregatesFilter<"Prescription"> | string
    medicines?: JsonWithAggregatesFilter<"Prescription">
    tests?: JsonNullableWithAggregatesFilter<"Prescription">
    advice?: StringNullableWithAggregatesFilter<"Prescription"> | string | null
    followUpDate?: DateTimeNullableWithAggregatesFilter<"Prescription"> | Date | string | null
    receipt?: StringNullableWithAggregatesFilter<"Prescription"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
  }

  export type LabReportWhereInput = {
    AND?: LabReportWhereInput | LabReportWhereInput[]
    OR?: LabReportWhereInput[]
    NOT?: LabReportWhereInput | LabReportWhereInput[]
    id?: StringFilter<"LabReport"> | string
    patientId?: StringFilter<"LabReport"> | string
    testName?: StringFilter<"LabReport"> | string
    testType?: StringFilter<"LabReport"> | string
    reportDate?: DateTimeFilter<"LabReport"> | Date | string
    doctorId?: StringNullableFilter<"LabReport"> | string | null
    results?: JsonFilter<"LabReport">
    conclusion?: StringNullableFilter<"LabReport"> | string | null
    recommendations?: StringNullableFilter<"LabReport"> | string | null
    reportFile?: StringFilter<"LabReport"> | string
    uploadedById?: StringFilter<"LabReport"> | string
    createdAt?: DateTimeFilter<"LabReport"> | Date | string
    updatedAt?: DateTimeFilter<"LabReport"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    doctor?: XOR<DoctorNullableRelationFilter, DoctorWhereInput> | null
    uploadedBy?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type LabReportOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    testName?: SortOrder
    testType?: SortOrder
    reportDate?: SortOrder
    doctorId?: SortOrderInput | SortOrder
    results?: SortOrder
    conclusion?: SortOrderInput | SortOrder
    recommendations?: SortOrderInput | SortOrder
    reportFile?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
    doctor?: DoctorOrderByWithRelationInput
    uploadedBy?: UserOrderByWithRelationInput
  }

  export type LabReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LabReportWhereInput | LabReportWhereInput[]
    OR?: LabReportWhereInput[]
    NOT?: LabReportWhereInput | LabReportWhereInput[]
    patientId?: StringFilter<"LabReport"> | string
    testName?: StringFilter<"LabReport"> | string
    testType?: StringFilter<"LabReport"> | string
    reportDate?: DateTimeFilter<"LabReport"> | Date | string
    doctorId?: StringNullableFilter<"LabReport"> | string | null
    results?: JsonFilter<"LabReport">
    conclusion?: StringNullableFilter<"LabReport"> | string | null
    recommendations?: StringNullableFilter<"LabReport"> | string | null
    reportFile?: StringFilter<"LabReport"> | string
    uploadedById?: StringFilter<"LabReport"> | string
    createdAt?: DateTimeFilter<"LabReport"> | Date | string
    updatedAt?: DateTimeFilter<"LabReport"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
    doctor?: XOR<DoctorNullableRelationFilter, DoctorWhereInput> | null
    uploadedBy?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type LabReportOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    testName?: SortOrder
    testType?: SortOrder
    reportDate?: SortOrder
    doctorId?: SortOrderInput | SortOrder
    results?: SortOrder
    conclusion?: SortOrderInput | SortOrder
    recommendations?: SortOrderInput | SortOrder
    reportFile?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LabReportCountOrderByAggregateInput
    _max?: LabReportMaxOrderByAggregateInput
    _min?: LabReportMinOrderByAggregateInput
  }

  export type LabReportScalarWhereWithAggregatesInput = {
    AND?: LabReportScalarWhereWithAggregatesInput | LabReportScalarWhereWithAggregatesInput[]
    OR?: LabReportScalarWhereWithAggregatesInput[]
    NOT?: LabReportScalarWhereWithAggregatesInput | LabReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LabReport"> | string
    patientId?: StringWithAggregatesFilter<"LabReport"> | string
    testName?: StringWithAggregatesFilter<"LabReport"> | string
    testType?: StringWithAggregatesFilter<"LabReport"> | string
    reportDate?: DateTimeWithAggregatesFilter<"LabReport"> | Date | string
    doctorId?: StringNullableWithAggregatesFilter<"LabReport"> | string | null
    results?: JsonWithAggregatesFilter<"LabReport">
    conclusion?: StringNullableWithAggregatesFilter<"LabReport"> | string | null
    recommendations?: StringNullableWithAggregatesFilter<"LabReport"> | string | null
    reportFile?: StringWithAggregatesFilter<"LabReport"> | string
    uploadedById?: StringWithAggregatesFilter<"LabReport"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LabReport"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LabReport"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    performedById?: StringFilter<"AuditLog"> | string
    targetUserId?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringFilter<"AuditLog"> | string
    severity?: StringFilter<"AuditLog"> | string
    ipAddress?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    updatedAt?: DateTimeFilter<"AuditLog"> | Date | string
    performedBy?: XOR<UserRelationFilter, UserWhereInput>
    targetUser?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    performedById?: SortOrder
    targetUserId?: SortOrderInput | SortOrder
    details?: SortOrder
    severity?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    performedBy?: UserOrderByWithRelationInput
    targetUser?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    performedById?: StringFilter<"AuditLog"> | string
    targetUserId?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringFilter<"AuditLog"> | string
    severity?: StringFilter<"AuditLog"> | string
    ipAddress?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    updatedAt?: DateTimeFilter<"AuditLog"> | Date | string
    performedBy?: XOR<UserRelationFilter, UserWhereInput>
    targetUser?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    performedById?: SortOrder
    targetUserId?: SortOrderInput | SortOrder
    details?: SortOrder
    severity?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    performedById?: StringWithAggregatesFilter<"AuditLog"> | string
    targetUserId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    details?: StringWithAggregatesFilter<"AuditLog"> | string
    severity?: StringWithAggregatesFilter<"AuditLog"> | string
    ipAddress?: StringWithAggregatesFilter<"AuditLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type BedCapacityWhereInput = {
    AND?: BedCapacityWhereInput | BedCapacityWhereInput[]
    OR?: BedCapacityWhereInput[]
    NOT?: BedCapacityWhereInput | BedCapacityWhereInput[]
    id?: StringFilter<"BedCapacity"> | string
    department?: StringFilter<"BedCapacity"> | string
    totalBeds?: IntFilter<"BedCapacity"> | number
    occupiedBeds?: IntFilter<"BedCapacity"> | number
    icuBeds?: IntFilter<"BedCapacity"> | number
    occupiedIcuBeds?: IntFilter<"BedCapacity"> | number
    createdAt?: DateTimeFilter<"BedCapacity"> | Date | string
    updatedAt?: DateTimeFilter<"BedCapacity"> | Date | string
  }

  export type BedCapacityOrderByWithRelationInput = {
    id?: SortOrder
    department?: SortOrder
    totalBeds?: SortOrder
    occupiedBeds?: SortOrder
    icuBeds?: SortOrder
    occupiedIcuBeds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BedCapacityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    department?: string
    AND?: BedCapacityWhereInput | BedCapacityWhereInput[]
    OR?: BedCapacityWhereInput[]
    NOT?: BedCapacityWhereInput | BedCapacityWhereInput[]
    totalBeds?: IntFilter<"BedCapacity"> | number
    occupiedBeds?: IntFilter<"BedCapacity"> | number
    icuBeds?: IntFilter<"BedCapacity"> | number
    occupiedIcuBeds?: IntFilter<"BedCapacity"> | number
    createdAt?: DateTimeFilter<"BedCapacity"> | Date | string
    updatedAt?: DateTimeFilter<"BedCapacity"> | Date | string
  }, "id" | "department">

  export type BedCapacityOrderByWithAggregationInput = {
    id?: SortOrder
    department?: SortOrder
    totalBeds?: SortOrder
    occupiedBeds?: SortOrder
    icuBeds?: SortOrder
    occupiedIcuBeds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BedCapacityCountOrderByAggregateInput
    _avg?: BedCapacityAvgOrderByAggregateInput
    _max?: BedCapacityMaxOrderByAggregateInput
    _min?: BedCapacityMinOrderByAggregateInput
    _sum?: BedCapacitySumOrderByAggregateInput
  }

  export type BedCapacityScalarWhereWithAggregatesInput = {
    AND?: BedCapacityScalarWhereWithAggregatesInput | BedCapacityScalarWhereWithAggregatesInput[]
    OR?: BedCapacityScalarWhereWithAggregatesInput[]
    NOT?: BedCapacityScalarWhereWithAggregatesInput | BedCapacityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BedCapacity"> | string
    department?: StringWithAggregatesFilter<"BedCapacity"> | string
    totalBeds?: IntWithAggregatesFilter<"BedCapacity"> | number
    occupiedBeds?: IntWithAggregatesFilter<"BedCapacity"> | number
    icuBeds?: IntWithAggregatesFilter<"BedCapacity"> | number
    occupiedIcuBeds?: IntWithAggregatesFilter<"BedCapacity"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BedCapacity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BedCapacity"> | Date | string
  }

  export type ContactMessageWhereInput = {
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    id?: StringFilter<"ContactMessage"> | string
    name?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    facility?: StringFilter<"ContactMessage"> | string
    role?: StringFilter<"ContactMessage"> | string
    phone?: StringNullableFilter<"ContactMessage"> | string | null
    message?: StringFilter<"ContactMessage"> | string
    status?: StringFilter<"ContactMessage"> | string
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
    updatedAt?: DateTimeFilter<"ContactMessage"> | Date | string
  }

  export type ContactMessageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    facility?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    name?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    facility?: StringFilter<"ContactMessage"> | string
    role?: StringFilter<"ContactMessage"> | string
    phone?: StringNullableFilter<"ContactMessage"> | string | null
    message?: StringFilter<"ContactMessage"> | string
    status?: StringFilter<"ContactMessage"> | string
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
    updatedAt?: DateTimeFilter<"ContactMessage"> | Date | string
  }, "id">

  export type ContactMessageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    facility?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContactMessageCountOrderByAggregateInput
    _max?: ContactMessageMaxOrderByAggregateInput
    _min?: ContactMessageMinOrderByAggregateInput
  }

  export type ContactMessageScalarWhereWithAggregatesInput = {
    AND?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    OR?: ContactMessageScalarWhereWithAggregatesInput[]
    NOT?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContactMessage"> | string
    name?: StringWithAggregatesFilter<"ContactMessage"> | string
    email?: StringWithAggregatesFilter<"ContactMessage"> | string
    facility?: StringWithAggregatesFilter<"ContactMessage"> | string
    role?: StringWithAggregatesFilter<"ContactMessage"> | string
    phone?: StringNullableWithAggregatesFilter<"ContactMessage"> | string | null
    message?: StringWithAggregatesFilter<"ContactMessage"> | string
    status?: StringWithAggregatesFilter<"ContactMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ContactMessage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ContactMessage"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    patient?: PatientCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorCreateInput = {
    id?: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDoctorInput
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
    prescriptions?: PrescriptionCreateNestedManyWithoutDoctorInput
    labReports?: LabReportCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateInput = {
    id?: string
    userId: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutDoctorInput
    labReports?: LabReportUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutDoctorNestedInput
    labReports?: LabReportUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutDoctorNestedInput
    labReports?: LabReportUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorCreateManyInput = {
    id?: string
    userId: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientCreateInput = {
    id?: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    triageRecords?: TriageRecordCreateNestedManyWithoutPatientInput
    bills?: BillCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionCreateNestedManyWithoutPatientInput
    labReports?: LabReportCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: string
    userId: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    triageRecords?: TriageRecordUncheckedCreateNestedManyWithoutPatientInput
    bills?: BillUncheckedCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
    labReports?: LabReportUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    triageRecords?: TriageRecordUpdateManyWithoutPatientNestedInput
    bills?: BillUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    triageRecords?: TriageRecordUncheckedUpdateManyWithoutPatientNestedInput
    bills?: BillUncheckedUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: string
    userId: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutAppointmentsInput
    doctor: DoctorCreateNestedOneWithoutAppointmentsInput
    prescription?: PrescriptionCreateNestedOneWithoutAppointmentInput
    cancelledBy?: UserCreateNestedOneWithoutCancelledAppointmentsInput
    bills?: BillCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    patientId: string
    doctorId: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: string | null
    cancellationReason?: string | null
    cancelledById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bills?: BillUncheckedCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentsNestedInput
    prescription?: PrescriptionUpdateOneWithoutAppointmentNestedInput
    cancelledBy?: UserUpdateOneWithoutCancelledAppointmentsNestedInput
    bills?: BillUpdateManyWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUncheckedUpdateManyWithoutAppointmentNestedInput
  }

  export type AppointmentCreateManyInput = {
    id?: string
    patientId: string
    doctorId: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: string | null
    cancellationReason?: string | null
    cancelledById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageRecordCreateInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receptionist: UserCreateNestedOneWithoutReceptionistTriageInput
    doctorReferred?: UserCreateNestedOneWithoutDoctorReferredTriageInput
    patient?: PatientCreateNestedOneWithoutTriageRecordsInput
  }

  export type TriageRecordUncheckedCreateInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId: string
    doctorReferredId?: string | null
    patientId?: string | null
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receptionist?: UserUpdateOneRequiredWithoutReceptionistTriageNestedInput
    doctorReferred?: UserUpdateOneWithoutDoctorReferredTriageNestedInput
    patient?: PatientUpdateOneWithoutTriageRecordsNestedInput
  }

  export type TriageRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId?: StringFieldUpdateOperationsInput | string
    doctorReferredId?: NullableStringFieldUpdateOperationsInput | string | null
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageRecordCreateManyInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId: string
    doctorReferredId?: string | null
    patientId?: string | null
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId?: StringFieldUpdateOperationsInput | string
    doctorReferredId?: NullableStringFieldUpdateOperationsInput | string | null
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillCreateInput = {
    id?: string
    triageId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient?: PatientCreateNestedOneWithoutBillsInput
    appointment?: AppointmentCreateNestedOneWithoutBillsInput
    createdBy: UserCreateNestedOneWithoutCreatedBillsInput
  }

  export type BillUncheckedCreateInput = {
    id?: string
    patientId?: string | null
    triageId?: string | null
    appointmentId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneWithoutBillsNestedInput
    appointment?: AppointmentUpdateOneWithoutBillsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedBillsNestedInput
  }

  export type BillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillCreateManyInput = {
    id?: string
    patientId?: string | null
    triageId?: string | null
    appointmentId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionCreateInput = {
    id?: string
    appointmentId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentCreateNestedOneWithoutPrescriptionInput
    patient: PatientCreateNestedOneWithoutPrescriptionsInput
    doctor: DoctorCreateNestedOneWithoutPrescriptionsInput
  }

  export type PrescriptionUncheckedCreateInput = {
    id?: string
    appointmentId: string
    patientId: string
    doctorId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentUncheckedCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUpdateOneWithoutPrescriptionNestedInput
    patient?: PatientUpdateOneRequiredWithoutPrescriptionsNestedInput
    doctor?: DoctorUpdateOneRequiredWithoutPrescriptionsNestedInput
  }

  export type PrescriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUncheckedUpdateOneWithoutPrescriptionNestedInput
  }

  export type PrescriptionCreateManyInput = {
    id?: string
    appointmentId: string
    patientId: string
    doctorId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabReportCreateInput = {
    id?: string
    testName: string
    testType: string
    reportDate: Date | string
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutLabReportsInput
    doctor?: DoctorCreateNestedOneWithoutLabReportsInput
    uploadedBy: UserCreateNestedOneWithoutUploadedLabReportsInput
  }

  export type LabReportUncheckedCreateInput = {
    id?: string
    patientId: string
    testName: string
    testType: string
    reportDate: Date | string
    doctorId?: string | null
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutLabReportsNestedInput
    doctor?: DoctorUpdateOneWithoutLabReportsNestedInput
    uploadedBy?: UserUpdateOneRequiredWithoutUploadedLabReportsNestedInput
  }

  export type LabReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabReportCreateManyInput = {
    id?: string
    patientId: string
    testName: string
    testType: string
    reportDate: Date | string
    doctorId?: string | null
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    details: string
    severity?: string
    ipAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    performedBy: UserCreateNestedOneWithoutPerformedAuditLogsInput
    targetUser?: UserCreateNestedOneWithoutTargetAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: string
    performedById: string
    targetUserId?: string | null
    details: string
    severity?: string
    ipAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    performedBy?: UserUpdateOneRequiredWithoutPerformedAuditLogsNestedInput
    targetUser?: UserUpdateOneWithoutTargetAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performedById?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: string
    performedById: string
    targetUserId?: string | null
    details: string
    severity?: string
    ipAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performedById?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BedCapacityCreateInput = {
    id?: string
    department: string
    totalBeds?: number
    occupiedBeds?: number
    icuBeds?: number
    occupiedIcuBeds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BedCapacityUncheckedCreateInput = {
    id?: string
    department: string
    totalBeds?: number
    occupiedBeds?: number
    icuBeds?: number
    occupiedIcuBeds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BedCapacityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    totalBeds?: IntFieldUpdateOperationsInput | number
    occupiedBeds?: IntFieldUpdateOperationsInput | number
    icuBeds?: IntFieldUpdateOperationsInput | number
    occupiedIcuBeds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BedCapacityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    totalBeds?: IntFieldUpdateOperationsInput | number
    occupiedBeds?: IntFieldUpdateOperationsInput | number
    icuBeds?: IntFieldUpdateOperationsInput | number
    occupiedIcuBeds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BedCapacityCreateManyInput = {
    id?: string
    department: string
    totalBeds?: number
    occupiedBeds?: number
    icuBeds?: number
    occupiedIcuBeds?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BedCapacityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    totalBeds?: IntFieldUpdateOperationsInput | number
    occupiedBeds?: IntFieldUpdateOperationsInput | number
    icuBeds?: IntFieldUpdateOperationsInput | number
    occupiedIcuBeds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BedCapacityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    totalBeds?: IntFieldUpdateOperationsInput | number
    occupiedBeds?: IntFieldUpdateOperationsInput | number
    icuBeds?: IntFieldUpdateOperationsInput | number
    occupiedIcuBeds?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageCreateInput = {
    id?: string
    name: string
    email: string
    facility: string
    role: string
    phone?: string | null
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactMessageUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    facility: string
    role: string
    phone?: string | null
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    facility?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    facility?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageCreateManyInput = {
    id?: string
    name: string
    email: string
    facility: string
    role: string
    phone?: string | null
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    facility?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    facility?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type DoctorNullableRelationFilter = {
    is?: DoctorWhereInput | null
    isNot?: DoctorWhereInput | null
  }

  export type PatientNullableRelationFilter = {
    is?: PatientWhereInput | null
    isNot?: PatientWhereInput | null
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type TriageRecordListRelationFilter = {
    every?: TriageRecordWhereInput
    some?: TriageRecordWhereInput
    none?: TriageRecordWhereInput
  }

  export type BillListRelationFilter = {
    every?: BillWhereInput
    some?: BillWhereInput
    none?: BillWhereInput
  }

  export type LabReportListRelationFilter = {
    every?: LabReportWhereInput
    some?: LabReportWhereInput
    none?: LabReportWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TriageRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LabReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    profile?: SortOrder
    isActive?: SortOrder
    isOffboarded?: SortOrder
    offboardedAt?: SortOrder
    offboardedById?: SortOrder
    lastLogin?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    isOffboarded?: SortOrder
    offboardedAt?: SortOrder
    offboardedById?: SortOrder
    lastLogin?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    isOffboarded?: SortOrder
    offboardedAt?: SortOrder
    offboardedById?: SortOrder
    lastLogin?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PrescriptionListRelationFilter = {
    every?: PrescriptionWhereInput
    some?: PrescriptionWhereInput
    none?: PrescriptionWhereInput
  }

  export type PrescriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DoctorCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    qualifications?: SortOrder
    experience?: SortOrder
    licenseNumber?: SortOrder
    consultationFee?: SortOrder
    availability?: SortOrder
    isAvailable?: SortOrder
    dutyStatus?: SortOrder
    rating?: SortOrder
    department?: SortOrder
    leaves?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorAvgOrderByAggregateInput = {
    experience?: SortOrder
    consultationFee?: SortOrder
  }

  export type DoctorMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    qualifications?: SortOrder
    experience?: SortOrder
    licenseNumber?: SortOrder
    consultationFee?: SortOrder
    isAvailable?: SortOrder
    dutyStatus?: SortOrder
    department?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    qualifications?: SortOrder
    experience?: SortOrder
    licenseNumber?: SortOrder
    consultationFee?: SortOrder
    isAvailable?: SortOrder
    dutyStatus?: SortOrder
    department?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorSumOrderByAggregateInput = {
    experience?: SortOrder
    consultationFee?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    medicalRecordNumber?: SortOrder
    medicalHistory?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    emergencyContact?: SortOrder
    bloodGroup?: SortOrder
    insuranceInfo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    medicalRecordNumber?: SortOrder
    bloodGroup?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    medicalRecordNumber?: SortOrder
    bloodGroup?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PatientRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type DoctorRelationFilter = {
    is?: DoctorWhereInput
    isNot?: DoctorWhereInput
  }

  export type PrescriptionNullableRelationFilter = {
    is?: PrescriptionWhereInput | null
    isNot?: PrescriptionWhereInput | null
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    timeSlot?: SortOrder
    status?: SortOrder
    paymentMode?: SortOrder
    paymentStatus?: SortOrder
    paymentDetails?: SortOrder
    consultationType?: SortOrder
    symptoms?: SortOrder
    notes?: SortOrder
    patientDocuments?: SortOrder
    prescriptionId?: SortOrder
    cancellationReason?: SortOrder
    cancelledById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    paymentMode?: SortOrder
    paymentStatus?: SortOrder
    consultationType?: SortOrder
    symptoms?: SortOrder
    notes?: SortOrder
    prescriptionId?: SortOrder
    cancellationReason?: SortOrder
    cancelledById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    paymentMode?: SortOrder
    paymentStatus?: SortOrder
    consultationType?: SortOrder
    symptoms?: SortOrder
    notes?: SortOrder
    prescriptionId?: SortOrder
    cancellationReason?: SortOrder
    cancelledById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TriageRecordCountOrderByAggregateInput = {
    id?: SortOrder
    patientName?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    contactNumber?: SortOrder
    symptoms?: SortOrder
    vitals?: SortOrder
    aiAnalysis?: SortOrder
    receptionistId?: SortOrder
    doctorReferredId?: SortOrder
    patientId?: SortOrder
    status?: SortOrder
    diagnosis?: SortOrder
    prescribedMedicines?: SortOrder
    tests?: SortOrder
    advice?: SortOrder
    followUpDate?: SortOrder
    triageId?: SortOrder
    checkedInAt?: SortOrder
    checkedOutAt?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TriageRecordAvgOrderByAggregateInput = {
    age?: SortOrder
  }

  export type TriageRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    patientName?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    contactNumber?: SortOrder
    symptoms?: SortOrder
    receptionistId?: SortOrder
    doctorReferredId?: SortOrder
    patientId?: SortOrder
    status?: SortOrder
    diagnosis?: SortOrder
    advice?: SortOrder
    followUpDate?: SortOrder
    triageId?: SortOrder
    checkedInAt?: SortOrder
    checkedOutAt?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TriageRecordMinOrderByAggregateInput = {
    id?: SortOrder
    patientName?: SortOrder
    age?: SortOrder
    gender?: SortOrder
    contactNumber?: SortOrder
    symptoms?: SortOrder
    receptionistId?: SortOrder
    doctorReferredId?: SortOrder
    patientId?: SortOrder
    status?: SortOrder
    diagnosis?: SortOrder
    advice?: SortOrder
    followUpDate?: SortOrder
    triageId?: SortOrder
    checkedInAt?: SortOrder
    checkedOutAt?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TriageRecordSumOrderByAggregateInput = {
    age?: SortOrder
  }

  export type AppointmentNullableRelationFilter = {
    is?: AppointmentWhereInput | null
    isNot?: AppointmentWhereInput | null
  }

  export type BillCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    triageId?: SortOrder
    appointmentId?: SortOrder
    items?: SortOrder
    subtotal?: SortOrder
    tax?: SortOrder
    total?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    paymentMethod?: SortOrder
    paymentDetails?: SortOrder
    receipt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillAvgOrderByAggregateInput = {
    subtotal?: SortOrder
    tax?: SortOrder
    total?: SortOrder
  }

  export type BillMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    triageId?: SortOrder
    appointmentId?: SortOrder
    subtotal?: SortOrder
    tax?: SortOrder
    total?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    paymentMethod?: SortOrder
    receipt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    triageId?: SortOrder
    appointmentId?: SortOrder
    subtotal?: SortOrder
    tax?: SortOrder
    total?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    paymentMethod?: SortOrder
    receipt?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillSumOrderByAggregateInput = {
    subtotal?: SortOrder
    tax?: SortOrder
    total?: SortOrder
  }

  export type PrescriptionCountOrderByAggregateInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    diagnosis?: SortOrder
    medicines?: SortOrder
    tests?: SortOrder
    advice?: SortOrder
    followUpDate?: SortOrder
    receipt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrescriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    diagnosis?: SortOrder
    advice?: SortOrder
    followUpDate?: SortOrder
    receipt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrescriptionMinOrderByAggregateInput = {
    id?: SortOrder
    appointmentId?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    diagnosis?: SortOrder
    advice?: SortOrder
    followUpDate?: SortOrder
    receipt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LabReportCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    testName?: SortOrder
    testType?: SortOrder
    reportDate?: SortOrder
    doctorId?: SortOrder
    results?: SortOrder
    conclusion?: SortOrder
    recommendations?: SortOrder
    reportFile?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LabReportMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    testName?: SortOrder
    testType?: SortOrder
    reportDate?: SortOrder
    doctorId?: SortOrder
    conclusion?: SortOrder
    recommendations?: SortOrder
    reportFile?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LabReportMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    testName?: SortOrder
    testType?: SortOrder
    reportDate?: SortOrder
    doctorId?: SortOrder
    conclusion?: SortOrder
    recommendations?: SortOrder
    reportFile?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    performedById?: SortOrder
    targetUserId?: SortOrder
    details?: SortOrder
    severity?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    performedById?: SortOrder
    targetUserId?: SortOrder
    details?: SortOrder
    severity?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    performedById?: SortOrder
    targetUserId?: SortOrder
    details?: SortOrder
    severity?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BedCapacityCountOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    totalBeds?: SortOrder
    occupiedBeds?: SortOrder
    icuBeds?: SortOrder
    occupiedIcuBeds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BedCapacityAvgOrderByAggregateInput = {
    totalBeds?: SortOrder
    occupiedBeds?: SortOrder
    icuBeds?: SortOrder
    occupiedIcuBeds?: SortOrder
  }

  export type BedCapacityMaxOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    totalBeds?: SortOrder
    occupiedBeds?: SortOrder
    icuBeds?: SortOrder
    occupiedIcuBeds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BedCapacityMinOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    totalBeds?: SortOrder
    occupiedBeds?: SortOrder
    icuBeds?: SortOrder
    occupiedIcuBeds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BedCapacitySumOrderByAggregateInput = {
    totalBeds?: SortOrder
    occupiedBeds?: SortOrder
    icuBeds?: SortOrder
    occupiedIcuBeds?: SortOrder
  }

  export type ContactMessageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    facility?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    facility?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMessageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    facility?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutOffboardedUsersInput = {
    create?: XOR<UserCreateWithoutOffboardedUsersInput, UserUncheckedCreateWithoutOffboardedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOffboardedUsersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutOffboardedByInput = {
    create?: XOR<UserCreateWithoutOffboardedByInput, UserUncheckedCreateWithoutOffboardedByInput> | UserCreateWithoutOffboardedByInput[] | UserUncheckedCreateWithoutOffboardedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOffboardedByInput | UserCreateOrConnectWithoutOffboardedByInput[]
    createMany?: UserCreateManyOffboardedByInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DoctorCreateNestedOneWithoutUserInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    connect?: DoctorWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutUserInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    connect?: PatientWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutCancelledByInput = {
    create?: XOR<AppointmentCreateWithoutCancelledByInput, AppointmentUncheckedCreateWithoutCancelledByInput> | AppointmentCreateWithoutCancelledByInput[] | AppointmentUncheckedCreateWithoutCancelledByInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutCancelledByInput | AppointmentCreateOrConnectWithoutCancelledByInput[]
    createMany?: AppointmentCreateManyCancelledByInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type TriageRecordCreateNestedManyWithoutReceptionistInput = {
    create?: XOR<TriageRecordCreateWithoutReceptionistInput, TriageRecordUncheckedCreateWithoutReceptionistInput> | TriageRecordCreateWithoutReceptionistInput[] | TriageRecordUncheckedCreateWithoutReceptionistInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutReceptionistInput | TriageRecordCreateOrConnectWithoutReceptionistInput[]
    createMany?: TriageRecordCreateManyReceptionistInputEnvelope
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
  }

  export type TriageRecordCreateNestedManyWithoutDoctorReferredInput = {
    create?: XOR<TriageRecordCreateWithoutDoctorReferredInput, TriageRecordUncheckedCreateWithoutDoctorReferredInput> | TriageRecordCreateWithoutDoctorReferredInput[] | TriageRecordUncheckedCreateWithoutDoctorReferredInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutDoctorReferredInput | TriageRecordCreateOrConnectWithoutDoctorReferredInput[]
    createMany?: TriageRecordCreateManyDoctorReferredInputEnvelope
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
  }

  export type BillCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BillCreateWithoutCreatedByInput, BillUncheckedCreateWithoutCreatedByInput> | BillCreateWithoutCreatedByInput[] | BillUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BillCreateOrConnectWithoutCreatedByInput | BillCreateOrConnectWithoutCreatedByInput[]
    createMany?: BillCreateManyCreatedByInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type LabReportCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<LabReportCreateWithoutUploadedByInput, LabReportUncheckedCreateWithoutUploadedByInput> | LabReportCreateWithoutUploadedByInput[] | LabReportUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutUploadedByInput | LabReportCreateOrConnectWithoutUploadedByInput[]
    createMany?: LabReportCreateManyUploadedByInputEnvelope
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutPerformedByInput = {
    create?: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput> | AuditLogCreateWithoutPerformedByInput[] | AuditLogUncheckedCreateWithoutPerformedByInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPerformedByInput | AuditLogCreateOrConnectWithoutPerformedByInput[]
    createMany?: AuditLogCreateManyPerformedByInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutTargetUserInput = {
    create?: XOR<AuditLogCreateWithoutTargetUserInput, AuditLogUncheckedCreateWithoutTargetUserInput> | AuditLogCreateWithoutTargetUserInput[] | AuditLogUncheckedCreateWithoutTargetUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutTargetUserInput | AuditLogCreateOrConnectWithoutTargetUserInput[]
    createMany?: AuditLogCreateManyTargetUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutOffboardedByInput = {
    create?: XOR<UserCreateWithoutOffboardedByInput, UserUncheckedCreateWithoutOffboardedByInput> | UserCreateWithoutOffboardedByInput[] | UserUncheckedCreateWithoutOffboardedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOffboardedByInput | UserCreateOrConnectWithoutOffboardedByInput[]
    createMany?: UserCreateManyOffboardedByInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DoctorUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    connect?: DoctorWhereUniqueInput
  }

  export type PatientUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    connect?: PatientWhereUniqueInput
  }

  export type AppointmentUncheckedCreateNestedManyWithoutCancelledByInput = {
    create?: XOR<AppointmentCreateWithoutCancelledByInput, AppointmentUncheckedCreateWithoutCancelledByInput> | AppointmentCreateWithoutCancelledByInput[] | AppointmentUncheckedCreateWithoutCancelledByInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutCancelledByInput | AppointmentCreateOrConnectWithoutCancelledByInput[]
    createMany?: AppointmentCreateManyCancelledByInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput = {
    create?: XOR<TriageRecordCreateWithoutReceptionistInput, TriageRecordUncheckedCreateWithoutReceptionistInput> | TriageRecordCreateWithoutReceptionistInput[] | TriageRecordUncheckedCreateWithoutReceptionistInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutReceptionistInput | TriageRecordCreateOrConnectWithoutReceptionistInput[]
    createMany?: TriageRecordCreateManyReceptionistInputEnvelope
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
  }

  export type TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput = {
    create?: XOR<TriageRecordCreateWithoutDoctorReferredInput, TriageRecordUncheckedCreateWithoutDoctorReferredInput> | TriageRecordCreateWithoutDoctorReferredInput[] | TriageRecordUncheckedCreateWithoutDoctorReferredInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutDoctorReferredInput | TriageRecordCreateOrConnectWithoutDoctorReferredInput[]
    createMany?: TriageRecordCreateManyDoctorReferredInputEnvelope
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
  }

  export type BillUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BillCreateWithoutCreatedByInput, BillUncheckedCreateWithoutCreatedByInput> | BillCreateWithoutCreatedByInput[] | BillUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BillCreateOrConnectWithoutCreatedByInput | BillCreateOrConnectWithoutCreatedByInput[]
    createMany?: BillCreateManyCreatedByInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type LabReportUncheckedCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<LabReportCreateWithoutUploadedByInput, LabReportUncheckedCreateWithoutUploadedByInput> | LabReportCreateWithoutUploadedByInput[] | LabReportUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutUploadedByInput | LabReportCreateOrConnectWithoutUploadedByInput[]
    createMany?: LabReportCreateManyUploadedByInputEnvelope
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutPerformedByInput = {
    create?: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput> | AuditLogCreateWithoutPerformedByInput[] | AuditLogUncheckedCreateWithoutPerformedByInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPerformedByInput | AuditLogCreateOrConnectWithoutPerformedByInput[]
    createMany?: AuditLogCreateManyPerformedByInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutTargetUserInput = {
    create?: XOR<AuditLogCreateWithoutTargetUserInput, AuditLogUncheckedCreateWithoutTargetUserInput> | AuditLogCreateWithoutTargetUserInput[] | AuditLogUncheckedCreateWithoutTargetUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutTargetUserInput | AuditLogCreateOrConnectWithoutTargetUserInput[]
    createMany?: AuditLogCreateManyTargetUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutOffboardedUsersNestedInput = {
    create?: XOR<UserCreateWithoutOffboardedUsersInput, UserUncheckedCreateWithoutOffboardedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOffboardedUsersInput
    upsert?: UserUpsertWithoutOffboardedUsersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOffboardedUsersInput, UserUpdateWithoutOffboardedUsersInput>, UserUncheckedUpdateWithoutOffboardedUsersInput>
  }

  export type UserUpdateManyWithoutOffboardedByNestedInput = {
    create?: XOR<UserCreateWithoutOffboardedByInput, UserUncheckedCreateWithoutOffboardedByInput> | UserCreateWithoutOffboardedByInput[] | UserUncheckedCreateWithoutOffboardedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOffboardedByInput | UserCreateOrConnectWithoutOffboardedByInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOffboardedByInput | UserUpsertWithWhereUniqueWithoutOffboardedByInput[]
    createMany?: UserCreateManyOffboardedByInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOffboardedByInput | UserUpdateWithWhereUniqueWithoutOffboardedByInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOffboardedByInput | UserUpdateManyWithWhereWithoutOffboardedByInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type DoctorUpdateOneWithoutUserNestedInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    upsert?: DoctorUpsertWithoutUserInput
    disconnect?: DoctorWhereInput | boolean
    delete?: DoctorWhereInput | boolean
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutUserInput, DoctorUpdateWithoutUserInput>, DoctorUncheckedUpdateWithoutUserInput>
  }

  export type PatientUpdateOneWithoutUserNestedInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    upsert?: PatientUpsertWithoutUserInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutUserInput, PatientUpdateWithoutUserInput>, PatientUncheckedUpdateWithoutUserInput>
  }

  export type AppointmentUpdateManyWithoutCancelledByNestedInput = {
    create?: XOR<AppointmentCreateWithoutCancelledByInput, AppointmentUncheckedCreateWithoutCancelledByInput> | AppointmentCreateWithoutCancelledByInput[] | AppointmentUncheckedCreateWithoutCancelledByInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutCancelledByInput | AppointmentCreateOrConnectWithoutCancelledByInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutCancelledByInput | AppointmentUpsertWithWhereUniqueWithoutCancelledByInput[]
    createMany?: AppointmentCreateManyCancelledByInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutCancelledByInput | AppointmentUpdateWithWhereUniqueWithoutCancelledByInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutCancelledByInput | AppointmentUpdateManyWithWhereWithoutCancelledByInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type TriageRecordUpdateManyWithoutReceptionistNestedInput = {
    create?: XOR<TriageRecordCreateWithoutReceptionistInput, TriageRecordUncheckedCreateWithoutReceptionistInput> | TriageRecordCreateWithoutReceptionistInput[] | TriageRecordUncheckedCreateWithoutReceptionistInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutReceptionistInput | TriageRecordCreateOrConnectWithoutReceptionistInput[]
    upsert?: TriageRecordUpsertWithWhereUniqueWithoutReceptionistInput | TriageRecordUpsertWithWhereUniqueWithoutReceptionistInput[]
    createMany?: TriageRecordCreateManyReceptionistInputEnvelope
    set?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    disconnect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    delete?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    update?: TriageRecordUpdateWithWhereUniqueWithoutReceptionistInput | TriageRecordUpdateWithWhereUniqueWithoutReceptionistInput[]
    updateMany?: TriageRecordUpdateManyWithWhereWithoutReceptionistInput | TriageRecordUpdateManyWithWhereWithoutReceptionistInput[]
    deleteMany?: TriageRecordScalarWhereInput | TriageRecordScalarWhereInput[]
  }

  export type TriageRecordUpdateManyWithoutDoctorReferredNestedInput = {
    create?: XOR<TriageRecordCreateWithoutDoctorReferredInput, TriageRecordUncheckedCreateWithoutDoctorReferredInput> | TriageRecordCreateWithoutDoctorReferredInput[] | TriageRecordUncheckedCreateWithoutDoctorReferredInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutDoctorReferredInput | TriageRecordCreateOrConnectWithoutDoctorReferredInput[]
    upsert?: TriageRecordUpsertWithWhereUniqueWithoutDoctorReferredInput | TriageRecordUpsertWithWhereUniqueWithoutDoctorReferredInput[]
    createMany?: TriageRecordCreateManyDoctorReferredInputEnvelope
    set?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    disconnect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    delete?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    update?: TriageRecordUpdateWithWhereUniqueWithoutDoctorReferredInput | TriageRecordUpdateWithWhereUniqueWithoutDoctorReferredInput[]
    updateMany?: TriageRecordUpdateManyWithWhereWithoutDoctorReferredInput | TriageRecordUpdateManyWithWhereWithoutDoctorReferredInput[]
    deleteMany?: TriageRecordScalarWhereInput | TriageRecordScalarWhereInput[]
  }

  export type BillUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BillCreateWithoutCreatedByInput, BillUncheckedCreateWithoutCreatedByInput> | BillCreateWithoutCreatedByInput[] | BillUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BillCreateOrConnectWithoutCreatedByInput | BillCreateOrConnectWithoutCreatedByInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutCreatedByInput | BillUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BillCreateManyCreatedByInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutCreatedByInput | BillUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BillUpdateManyWithWhereWithoutCreatedByInput | BillUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type LabReportUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<LabReportCreateWithoutUploadedByInput, LabReportUncheckedCreateWithoutUploadedByInput> | LabReportCreateWithoutUploadedByInput[] | LabReportUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutUploadedByInput | LabReportCreateOrConnectWithoutUploadedByInput[]
    upsert?: LabReportUpsertWithWhereUniqueWithoutUploadedByInput | LabReportUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: LabReportCreateManyUploadedByInputEnvelope
    set?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    disconnect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    delete?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    update?: LabReportUpdateWithWhereUniqueWithoutUploadedByInput | LabReportUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: LabReportUpdateManyWithWhereWithoutUploadedByInput | LabReportUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: LabReportScalarWhereInput | LabReportScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutPerformedByNestedInput = {
    create?: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput> | AuditLogCreateWithoutPerformedByInput[] | AuditLogUncheckedCreateWithoutPerformedByInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPerformedByInput | AuditLogCreateOrConnectWithoutPerformedByInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutPerformedByInput | AuditLogUpsertWithWhereUniqueWithoutPerformedByInput[]
    createMany?: AuditLogCreateManyPerformedByInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutPerformedByInput | AuditLogUpdateWithWhereUniqueWithoutPerformedByInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutPerformedByInput | AuditLogUpdateManyWithWhereWithoutPerformedByInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutTargetUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutTargetUserInput, AuditLogUncheckedCreateWithoutTargetUserInput> | AuditLogCreateWithoutTargetUserInput[] | AuditLogUncheckedCreateWithoutTargetUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutTargetUserInput | AuditLogCreateOrConnectWithoutTargetUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutTargetUserInput | AuditLogUpsertWithWhereUniqueWithoutTargetUserInput[]
    createMany?: AuditLogCreateManyTargetUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutTargetUserInput | AuditLogUpdateWithWhereUniqueWithoutTargetUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutTargetUserInput | AuditLogUpdateManyWithWhereWithoutTargetUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutOffboardedByNestedInput = {
    create?: XOR<UserCreateWithoutOffboardedByInput, UserUncheckedCreateWithoutOffboardedByInput> | UserCreateWithoutOffboardedByInput[] | UserUncheckedCreateWithoutOffboardedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOffboardedByInput | UserCreateOrConnectWithoutOffboardedByInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOffboardedByInput | UserUpsertWithWhereUniqueWithoutOffboardedByInput[]
    createMany?: UserCreateManyOffboardedByInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOffboardedByInput | UserUpdateWithWhereUniqueWithoutOffboardedByInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOffboardedByInput | UserUpdateManyWithWhereWithoutOffboardedByInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type DoctorUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    upsert?: DoctorUpsertWithoutUserInput
    disconnect?: DoctorWhereInput | boolean
    delete?: DoctorWhereInput | boolean
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutUserInput, DoctorUpdateWithoutUserInput>, DoctorUncheckedUpdateWithoutUserInput>
  }

  export type PatientUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    upsert?: PatientUpsertWithoutUserInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutUserInput, PatientUpdateWithoutUserInput>, PatientUncheckedUpdateWithoutUserInput>
  }

  export type AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput = {
    create?: XOR<AppointmentCreateWithoutCancelledByInput, AppointmentUncheckedCreateWithoutCancelledByInput> | AppointmentCreateWithoutCancelledByInput[] | AppointmentUncheckedCreateWithoutCancelledByInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutCancelledByInput | AppointmentCreateOrConnectWithoutCancelledByInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutCancelledByInput | AppointmentUpsertWithWhereUniqueWithoutCancelledByInput[]
    createMany?: AppointmentCreateManyCancelledByInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutCancelledByInput | AppointmentUpdateWithWhereUniqueWithoutCancelledByInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutCancelledByInput | AppointmentUpdateManyWithWhereWithoutCancelledByInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput = {
    create?: XOR<TriageRecordCreateWithoutReceptionistInput, TriageRecordUncheckedCreateWithoutReceptionistInput> | TriageRecordCreateWithoutReceptionistInput[] | TriageRecordUncheckedCreateWithoutReceptionistInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutReceptionistInput | TriageRecordCreateOrConnectWithoutReceptionistInput[]
    upsert?: TriageRecordUpsertWithWhereUniqueWithoutReceptionistInput | TriageRecordUpsertWithWhereUniqueWithoutReceptionistInput[]
    createMany?: TriageRecordCreateManyReceptionistInputEnvelope
    set?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    disconnect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    delete?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    update?: TriageRecordUpdateWithWhereUniqueWithoutReceptionistInput | TriageRecordUpdateWithWhereUniqueWithoutReceptionistInput[]
    updateMany?: TriageRecordUpdateManyWithWhereWithoutReceptionistInput | TriageRecordUpdateManyWithWhereWithoutReceptionistInput[]
    deleteMany?: TriageRecordScalarWhereInput | TriageRecordScalarWhereInput[]
  }

  export type TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput = {
    create?: XOR<TriageRecordCreateWithoutDoctorReferredInput, TriageRecordUncheckedCreateWithoutDoctorReferredInput> | TriageRecordCreateWithoutDoctorReferredInput[] | TriageRecordUncheckedCreateWithoutDoctorReferredInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutDoctorReferredInput | TriageRecordCreateOrConnectWithoutDoctorReferredInput[]
    upsert?: TriageRecordUpsertWithWhereUniqueWithoutDoctorReferredInput | TriageRecordUpsertWithWhereUniqueWithoutDoctorReferredInput[]
    createMany?: TriageRecordCreateManyDoctorReferredInputEnvelope
    set?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    disconnect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    delete?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    update?: TriageRecordUpdateWithWhereUniqueWithoutDoctorReferredInput | TriageRecordUpdateWithWhereUniqueWithoutDoctorReferredInput[]
    updateMany?: TriageRecordUpdateManyWithWhereWithoutDoctorReferredInput | TriageRecordUpdateManyWithWhereWithoutDoctorReferredInput[]
    deleteMany?: TriageRecordScalarWhereInput | TriageRecordScalarWhereInput[]
  }

  export type BillUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BillCreateWithoutCreatedByInput, BillUncheckedCreateWithoutCreatedByInput> | BillCreateWithoutCreatedByInput[] | BillUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BillCreateOrConnectWithoutCreatedByInput | BillCreateOrConnectWithoutCreatedByInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutCreatedByInput | BillUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BillCreateManyCreatedByInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutCreatedByInput | BillUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BillUpdateManyWithWhereWithoutCreatedByInput | BillUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type LabReportUncheckedUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<LabReportCreateWithoutUploadedByInput, LabReportUncheckedCreateWithoutUploadedByInput> | LabReportCreateWithoutUploadedByInput[] | LabReportUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutUploadedByInput | LabReportCreateOrConnectWithoutUploadedByInput[]
    upsert?: LabReportUpsertWithWhereUniqueWithoutUploadedByInput | LabReportUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: LabReportCreateManyUploadedByInputEnvelope
    set?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    disconnect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    delete?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    update?: LabReportUpdateWithWhereUniqueWithoutUploadedByInput | LabReportUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: LabReportUpdateManyWithWhereWithoutUploadedByInput | LabReportUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: LabReportScalarWhereInput | LabReportScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput = {
    create?: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput> | AuditLogCreateWithoutPerformedByInput[] | AuditLogUncheckedCreateWithoutPerformedByInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPerformedByInput | AuditLogCreateOrConnectWithoutPerformedByInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutPerformedByInput | AuditLogUpsertWithWhereUniqueWithoutPerformedByInput[]
    createMany?: AuditLogCreateManyPerformedByInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutPerformedByInput | AuditLogUpdateWithWhereUniqueWithoutPerformedByInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutPerformedByInput | AuditLogUpdateManyWithWhereWithoutPerformedByInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutTargetUserInput, AuditLogUncheckedCreateWithoutTargetUserInput> | AuditLogCreateWithoutTargetUserInput[] | AuditLogUncheckedCreateWithoutTargetUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutTargetUserInput | AuditLogCreateOrConnectWithoutTargetUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutTargetUserInput | AuditLogUpsertWithWhereUniqueWithoutTargetUserInput[]
    createMany?: AuditLogCreateManyTargetUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutTargetUserInput | AuditLogUpdateWithWhereUniqueWithoutTargetUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutTargetUserInput | AuditLogUpdateManyWithWhereWithoutTargetUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDoctorInput = {
    create?: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorInput
    connect?: UserWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutDoctorInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PrescriptionCreateNestedManyWithoutDoctorInput = {
    create?: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput> | PrescriptionCreateWithoutDoctorInput[] | PrescriptionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutDoctorInput | PrescriptionCreateOrConnectWithoutDoctorInput[]
    createMany?: PrescriptionCreateManyDoctorInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type LabReportCreateNestedManyWithoutDoctorInput = {
    create?: XOR<LabReportCreateWithoutDoctorInput, LabReportUncheckedCreateWithoutDoctorInput> | LabReportCreateWithoutDoctorInput[] | LabReportUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutDoctorInput | LabReportCreateOrConnectWithoutDoctorInput[]
    createMany?: LabReportCreateManyDoctorInputEnvelope
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PrescriptionUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput> | PrescriptionCreateWithoutDoctorInput[] | PrescriptionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutDoctorInput | PrescriptionCreateOrConnectWithoutDoctorInput[]
    createMany?: PrescriptionCreateManyDoctorInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type LabReportUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<LabReportCreateWithoutDoctorInput, LabReportUncheckedCreateWithoutDoctorInput> | LabReportCreateWithoutDoctorInput[] | LabReportUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutDoctorInput | LabReportCreateOrConnectWithoutDoctorInput[]
    createMany?: LabReportCreateManyDoctorInputEnvelope
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutDoctorNestedInput = {
    create?: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorInput
    upsert?: UserUpsertWithoutDoctorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoctorInput, UserUpdateWithoutDoctorInput>, UserUncheckedUpdateWithoutDoctorInput>
  }

  export type AppointmentUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDoctorInput | AppointmentUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDoctorInput | AppointmentUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDoctorInput | AppointmentUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PrescriptionUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput> | PrescriptionCreateWithoutDoctorInput[] | PrescriptionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutDoctorInput | PrescriptionCreateOrConnectWithoutDoctorInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutDoctorInput | PrescriptionUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: PrescriptionCreateManyDoctorInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutDoctorInput | PrescriptionUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutDoctorInput | PrescriptionUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type LabReportUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<LabReportCreateWithoutDoctorInput, LabReportUncheckedCreateWithoutDoctorInput> | LabReportCreateWithoutDoctorInput[] | LabReportUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutDoctorInput | LabReportCreateOrConnectWithoutDoctorInput[]
    upsert?: LabReportUpsertWithWhereUniqueWithoutDoctorInput | LabReportUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: LabReportCreateManyDoctorInputEnvelope
    set?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    disconnect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    delete?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    update?: LabReportUpdateWithWhereUniqueWithoutDoctorInput | LabReportUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: LabReportUpdateManyWithWhereWithoutDoctorInput | LabReportUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: LabReportScalarWhereInput | LabReportScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDoctorInput | AppointmentUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDoctorInput | AppointmentUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDoctorInput | AppointmentUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PrescriptionUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput> | PrescriptionCreateWithoutDoctorInput[] | PrescriptionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutDoctorInput | PrescriptionCreateOrConnectWithoutDoctorInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutDoctorInput | PrescriptionUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: PrescriptionCreateManyDoctorInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutDoctorInput | PrescriptionUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutDoctorInput | PrescriptionUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type LabReportUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<LabReportCreateWithoutDoctorInput, LabReportUncheckedCreateWithoutDoctorInput> | LabReportCreateWithoutDoctorInput[] | LabReportUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutDoctorInput | LabReportCreateOrConnectWithoutDoctorInput[]
    upsert?: LabReportUpsertWithWhereUniqueWithoutDoctorInput | LabReportUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: LabReportCreateManyDoctorInputEnvelope
    set?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    disconnect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    delete?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    update?: LabReportUpdateWithWhereUniqueWithoutDoctorInput | LabReportUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: LabReportUpdateManyWithWhereWithoutDoctorInput | LabReportUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: LabReportScalarWhereInput | LabReportScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPatientInput = {
    create?: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientInput
    connect?: UserWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type TriageRecordCreateNestedManyWithoutPatientInput = {
    create?: XOR<TriageRecordCreateWithoutPatientInput, TriageRecordUncheckedCreateWithoutPatientInput> | TriageRecordCreateWithoutPatientInput[] | TriageRecordUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutPatientInput | TriageRecordCreateOrConnectWithoutPatientInput[]
    createMany?: TriageRecordCreateManyPatientInputEnvelope
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
  }

  export type BillCreateNestedManyWithoutPatientInput = {
    create?: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput> | BillCreateWithoutPatientInput[] | BillUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPatientInput | BillCreateOrConnectWithoutPatientInput[]
    createMany?: BillCreateManyPatientInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type PrescriptionCreateNestedManyWithoutPatientInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type LabReportCreateNestedManyWithoutPatientInput = {
    create?: XOR<LabReportCreateWithoutPatientInput, LabReportUncheckedCreateWithoutPatientInput> | LabReportCreateWithoutPatientInput[] | LabReportUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutPatientInput | LabReportCreateOrConnectWithoutPatientInput[]
    createMany?: LabReportCreateManyPatientInputEnvelope
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type TriageRecordUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<TriageRecordCreateWithoutPatientInput, TriageRecordUncheckedCreateWithoutPatientInput> | TriageRecordCreateWithoutPatientInput[] | TriageRecordUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutPatientInput | TriageRecordCreateOrConnectWithoutPatientInput[]
    createMany?: TriageRecordCreateManyPatientInputEnvelope
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
  }

  export type BillUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput> | BillCreateWithoutPatientInput[] | BillUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPatientInput | BillCreateOrConnectWithoutPatientInput[]
    createMany?: BillCreateManyPatientInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type PrescriptionUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type LabReportUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<LabReportCreateWithoutPatientInput, LabReportUncheckedCreateWithoutPatientInput> | LabReportCreateWithoutPatientInput[] | LabReportUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutPatientInput | LabReportCreateOrConnectWithoutPatientInput[]
    createMany?: LabReportCreateManyPatientInputEnvelope
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPatientNestedInput = {
    create?: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientInput
    upsert?: UserUpsertWithoutPatientInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientInput, UserUpdateWithoutPatientInput>, UserUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type TriageRecordUpdateManyWithoutPatientNestedInput = {
    create?: XOR<TriageRecordCreateWithoutPatientInput, TriageRecordUncheckedCreateWithoutPatientInput> | TriageRecordCreateWithoutPatientInput[] | TriageRecordUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutPatientInput | TriageRecordCreateOrConnectWithoutPatientInput[]
    upsert?: TriageRecordUpsertWithWhereUniqueWithoutPatientInput | TriageRecordUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: TriageRecordCreateManyPatientInputEnvelope
    set?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    disconnect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    delete?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    update?: TriageRecordUpdateWithWhereUniqueWithoutPatientInput | TriageRecordUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: TriageRecordUpdateManyWithWhereWithoutPatientInput | TriageRecordUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: TriageRecordScalarWhereInput | TriageRecordScalarWhereInput[]
  }

  export type BillUpdateManyWithoutPatientNestedInput = {
    create?: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput> | BillCreateWithoutPatientInput[] | BillUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPatientInput | BillCreateOrConnectWithoutPatientInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutPatientInput | BillUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: BillCreateManyPatientInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutPatientInput | BillUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: BillUpdateManyWithWhereWithoutPatientInput | BillUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type PrescriptionUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutPatientInput | PrescriptionUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutPatientInput | PrescriptionUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutPatientInput | PrescriptionUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type LabReportUpdateManyWithoutPatientNestedInput = {
    create?: XOR<LabReportCreateWithoutPatientInput, LabReportUncheckedCreateWithoutPatientInput> | LabReportCreateWithoutPatientInput[] | LabReportUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutPatientInput | LabReportCreateOrConnectWithoutPatientInput[]
    upsert?: LabReportUpsertWithWhereUniqueWithoutPatientInput | LabReportUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: LabReportCreateManyPatientInputEnvelope
    set?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    disconnect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    delete?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    update?: LabReportUpdateWithWhereUniqueWithoutPatientInput | LabReportUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: LabReportUpdateManyWithWhereWithoutPatientInput | LabReportUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: LabReportScalarWhereInput | LabReportScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type TriageRecordUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<TriageRecordCreateWithoutPatientInput, TriageRecordUncheckedCreateWithoutPatientInput> | TriageRecordCreateWithoutPatientInput[] | TriageRecordUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: TriageRecordCreateOrConnectWithoutPatientInput | TriageRecordCreateOrConnectWithoutPatientInput[]
    upsert?: TriageRecordUpsertWithWhereUniqueWithoutPatientInput | TriageRecordUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: TriageRecordCreateManyPatientInputEnvelope
    set?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    disconnect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    delete?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    connect?: TriageRecordWhereUniqueInput | TriageRecordWhereUniqueInput[]
    update?: TriageRecordUpdateWithWhereUniqueWithoutPatientInput | TriageRecordUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: TriageRecordUpdateManyWithWhereWithoutPatientInput | TriageRecordUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: TriageRecordScalarWhereInput | TriageRecordScalarWhereInput[]
  }

  export type BillUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput> | BillCreateWithoutPatientInput[] | BillUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPatientInput | BillCreateOrConnectWithoutPatientInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutPatientInput | BillUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: BillCreateManyPatientInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutPatientInput | BillUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: BillUpdateManyWithWhereWithoutPatientInput | BillUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type PrescriptionUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutPatientInput | PrescriptionUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutPatientInput | PrescriptionUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutPatientInput | PrescriptionUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type LabReportUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<LabReportCreateWithoutPatientInput, LabReportUncheckedCreateWithoutPatientInput> | LabReportCreateWithoutPatientInput[] | LabReportUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: LabReportCreateOrConnectWithoutPatientInput | LabReportCreateOrConnectWithoutPatientInput[]
    upsert?: LabReportUpsertWithWhereUniqueWithoutPatientInput | LabReportUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: LabReportCreateManyPatientInputEnvelope
    set?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    disconnect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    delete?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    connect?: LabReportWhereUniqueInput | LabReportWhereUniqueInput[]
    update?: LabReportUpdateWithWhereUniqueWithoutPatientInput | LabReportUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: LabReportUpdateManyWithWhereWithoutPatientInput | LabReportUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: LabReportScalarWhereInput | LabReportScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentsInput
    connect?: PatientWhereUniqueInput
  }

  export type DoctorCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<DoctorCreateWithoutAppointmentsInput, DoctorUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutAppointmentsInput
    connect?: DoctorWhereUniqueInput
  }

  export type PrescriptionCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<PrescriptionCreateWithoutAppointmentInput, PrescriptionUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutAppointmentInput
    connect?: PrescriptionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCancelledAppointmentsInput = {
    create?: XOR<UserCreateWithoutCancelledAppointmentsInput, UserUncheckedCreateWithoutCancelledAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCancelledAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type BillCreateNestedManyWithoutAppointmentInput = {
    create?: XOR<BillCreateWithoutAppointmentInput, BillUncheckedCreateWithoutAppointmentInput> | BillCreateWithoutAppointmentInput[] | BillUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: BillCreateOrConnectWithoutAppointmentInput | BillCreateOrConnectWithoutAppointmentInput[]
    createMany?: BillCreateManyAppointmentInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type BillUncheckedCreateNestedManyWithoutAppointmentInput = {
    create?: XOR<BillCreateWithoutAppointmentInput, BillUncheckedCreateWithoutAppointmentInput> | BillCreateWithoutAppointmentInput[] | BillUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: BillCreateOrConnectWithoutAppointmentInput | BillCreateOrConnectWithoutAppointmentInput[]
    createMany?: BillCreateManyAppointmentInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type PatientUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentsInput
    upsert?: PatientUpsertWithoutAppointmentsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutAppointmentsInput, PatientUpdateWithoutAppointmentsInput>, PatientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type DoctorUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<DoctorCreateWithoutAppointmentsInput, DoctorUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutAppointmentsInput
    upsert?: DoctorUpsertWithoutAppointmentsInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutAppointmentsInput, DoctorUpdateWithoutAppointmentsInput>, DoctorUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PrescriptionUpdateOneWithoutAppointmentNestedInput = {
    create?: XOR<PrescriptionCreateWithoutAppointmentInput, PrescriptionUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutAppointmentInput
    upsert?: PrescriptionUpsertWithoutAppointmentInput
    disconnect?: PrescriptionWhereInput | boolean
    delete?: PrescriptionWhereInput | boolean
    connect?: PrescriptionWhereUniqueInput
    update?: XOR<XOR<PrescriptionUpdateToOneWithWhereWithoutAppointmentInput, PrescriptionUpdateWithoutAppointmentInput>, PrescriptionUncheckedUpdateWithoutAppointmentInput>
  }

  export type UserUpdateOneWithoutCancelledAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutCancelledAppointmentsInput, UserUncheckedCreateWithoutCancelledAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCancelledAppointmentsInput
    upsert?: UserUpsertWithoutCancelledAppointmentsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCancelledAppointmentsInput, UserUpdateWithoutCancelledAppointmentsInput>, UserUncheckedUpdateWithoutCancelledAppointmentsInput>
  }

  export type BillUpdateManyWithoutAppointmentNestedInput = {
    create?: XOR<BillCreateWithoutAppointmentInput, BillUncheckedCreateWithoutAppointmentInput> | BillCreateWithoutAppointmentInput[] | BillUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: BillCreateOrConnectWithoutAppointmentInput | BillCreateOrConnectWithoutAppointmentInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutAppointmentInput | BillUpsertWithWhereUniqueWithoutAppointmentInput[]
    createMany?: BillCreateManyAppointmentInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutAppointmentInput | BillUpdateWithWhereUniqueWithoutAppointmentInput[]
    updateMany?: BillUpdateManyWithWhereWithoutAppointmentInput | BillUpdateManyWithWhereWithoutAppointmentInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type BillUncheckedUpdateManyWithoutAppointmentNestedInput = {
    create?: XOR<BillCreateWithoutAppointmentInput, BillUncheckedCreateWithoutAppointmentInput> | BillCreateWithoutAppointmentInput[] | BillUncheckedCreateWithoutAppointmentInput[]
    connectOrCreate?: BillCreateOrConnectWithoutAppointmentInput | BillCreateOrConnectWithoutAppointmentInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutAppointmentInput | BillUpsertWithWhereUniqueWithoutAppointmentInput[]
    createMany?: BillCreateManyAppointmentInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutAppointmentInput | BillUpdateWithWhereUniqueWithoutAppointmentInput[]
    updateMany?: BillUpdateManyWithWhereWithoutAppointmentInput | BillUpdateManyWithWhereWithoutAppointmentInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutReceptionistTriageInput = {
    create?: XOR<UserCreateWithoutReceptionistTriageInput, UserUncheckedCreateWithoutReceptionistTriageInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceptionistTriageInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDoctorReferredTriageInput = {
    create?: XOR<UserCreateWithoutDoctorReferredTriageInput, UserUncheckedCreateWithoutDoctorReferredTriageInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorReferredTriageInput
    connect?: UserWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutTriageRecordsInput = {
    create?: XOR<PatientCreateWithoutTriageRecordsInput, PatientUncheckedCreateWithoutTriageRecordsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutTriageRecordsInput
    connect?: PatientWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutReceptionistTriageNestedInput = {
    create?: XOR<UserCreateWithoutReceptionistTriageInput, UserUncheckedCreateWithoutReceptionistTriageInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceptionistTriageInput
    upsert?: UserUpsertWithoutReceptionistTriageInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceptionistTriageInput, UserUpdateWithoutReceptionistTriageInput>, UserUncheckedUpdateWithoutReceptionistTriageInput>
  }

  export type UserUpdateOneWithoutDoctorReferredTriageNestedInput = {
    create?: XOR<UserCreateWithoutDoctorReferredTriageInput, UserUncheckedCreateWithoutDoctorReferredTriageInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorReferredTriageInput
    upsert?: UserUpsertWithoutDoctorReferredTriageInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoctorReferredTriageInput, UserUpdateWithoutDoctorReferredTriageInput>, UserUncheckedUpdateWithoutDoctorReferredTriageInput>
  }

  export type PatientUpdateOneWithoutTriageRecordsNestedInput = {
    create?: XOR<PatientCreateWithoutTriageRecordsInput, PatientUncheckedCreateWithoutTriageRecordsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutTriageRecordsInput
    upsert?: PatientUpsertWithoutTriageRecordsInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutTriageRecordsInput, PatientUpdateWithoutTriageRecordsInput>, PatientUncheckedUpdateWithoutTriageRecordsInput>
  }

  export type PatientCreateNestedOneWithoutBillsInput = {
    create?: XOR<PatientCreateWithoutBillsInput, PatientUncheckedCreateWithoutBillsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutBillsInput
    connect?: PatientWhereUniqueInput
  }

  export type AppointmentCreateNestedOneWithoutBillsInput = {
    create?: XOR<AppointmentCreateWithoutBillsInput, AppointmentUncheckedCreateWithoutBillsInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutBillsInput
    connect?: AppointmentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedBillsInput = {
    create?: XOR<UserCreateWithoutCreatedBillsInput, UserUncheckedCreateWithoutCreatedBillsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedBillsInput
    connect?: UserWhereUniqueInput
  }

  export type PatientUpdateOneWithoutBillsNestedInput = {
    create?: XOR<PatientCreateWithoutBillsInput, PatientUncheckedCreateWithoutBillsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutBillsInput
    upsert?: PatientUpsertWithoutBillsInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutBillsInput, PatientUpdateWithoutBillsInput>, PatientUncheckedUpdateWithoutBillsInput>
  }

  export type AppointmentUpdateOneWithoutBillsNestedInput = {
    create?: XOR<AppointmentCreateWithoutBillsInput, AppointmentUncheckedCreateWithoutBillsInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutBillsInput
    upsert?: AppointmentUpsertWithoutBillsInput
    disconnect?: AppointmentWhereInput | boolean
    delete?: AppointmentWhereInput | boolean
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutBillsInput, AppointmentUpdateWithoutBillsInput>, AppointmentUncheckedUpdateWithoutBillsInput>
  }

  export type UserUpdateOneRequiredWithoutCreatedBillsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedBillsInput, UserUncheckedCreateWithoutCreatedBillsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedBillsInput
    upsert?: UserUpsertWithoutCreatedBillsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedBillsInput, UserUpdateWithoutCreatedBillsInput>, UserUncheckedUpdateWithoutCreatedBillsInput>
  }

  export type AppointmentCreateNestedOneWithoutPrescriptionInput = {
    create?: XOR<AppointmentCreateWithoutPrescriptionInput, AppointmentUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutPrescriptionInput
    connect?: AppointmentWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutPrescriptionsInput = {
    create?: XOR<PatientCreateWithoutPrescriptionsInput, PatientUncheckedCreateWithoutPrescriptionsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPrescriptionsInput
    connect?: PatientWhereUniqueInput
  }

  export type DoctorCreateNestedOneWithoutPrescriptionsInput = {
    create?: XOR<DoctorCreateWithoutPrescriptionsInput, DoctorUncheckedCreateWithoutPrescriptionsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutPrescriptionsInput
    connect?: DoctorWhereUniqueInput
  }

  export type AppointmentUncheckedCreateNestedOneWithoutPrescriptionInput = {
    create?: XOR<AppointmentCreateWithoutPrescriptionInput, AppointmentUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutPrescriptionInput
    connect?: AppointmentWhereUniqueInput
  }

  export type AppointmentUpdateOneWithoutPrescriptionNestedInput = {
    create?: XOR<AppointmentCreateWithoutPrescriptionInput, AppointmentUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutPrescriptionInput
    upsert?: AppointmentUpsertWithoutPrescriptionInput
    disconnect?: AppointmentWhereInput | boolean
    delete?: AppointmentWhereInput | boolean
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutPrescriptionInput, AppointmentUpdateWithoutPrescriptionInput>, AppointmentUncheckedUpdateWithoutPrescriptionInput>
  }

  export type PatientUpdateOneRequiredWithoutPrescriptionsNestedInput = {
    create?: XOR<PatientCreateWithoutPrescriptionsInput, PatientUncheckedCreateWithoutPrescriptionsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPrescriptionsInput
    upsert?: PatientUpsertWithoutPrescriptionsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutPrescriptionsInput, PatientUpdateWithoutPrescriptionsInput>, PatientUncheckedUpdateWithoutPrescriptionsInput>
  }

  export type DoctorUpdateOneRequiredWithoutPrescriptionsNestedInput = {
    create?: XOR<DoctorCreateWithoutPrescriptionsInput, DoctorUncheckedCreateWithoutPrescriptionsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutPrescriptionsInput
    upsert?: DoctorUpsertWithoutPrescriptionsInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutPrescriptionsInput, DoctorUpdateWithoutPrescriptionsInput>, DoctorUncheckedUpdateWithoutPrescriptionsInput>
  }

  export type AppointmentUncheckedUpdateOneWithoutPrescriptionNestedInput = {
    create?: XOR<AppointmentCreateWithoutPrescriptionInput, AppointmentUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutPrescriptionInput
    upsert?: AppointmentUpsertWithoutPrescriptionInput
    disconnect?: AppointmentWhereInput | boolean
    delete?: AppointmentWhereInput | boolean
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutPrescriptionInput, AppointmentUpdateWithoutPrescriptionInput>, AppointmentUncheckedUpdateWithoutPrescriptionInput>
  }

  export type PatientCreateNestedOneWithoutLabReportsInput = {
    create?: XOR<PatientCreateWithoutLabReportsInput, PatientUncheckedCreateWithoutLabReportsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutLabReportsInput
    connect?: PatientWhereUniqueInput
  }

  export type DoctorCreateNestedOneWithoutLabReportsInput = {
    create?: XOR<DoctorCreateWithoutLabReportsInput, DoctorUncheckedCreateWithoutLabReportsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutLabReportsInput
    connect?: DoctorWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUploadedLabReportsInput = {
    create?: XOR<UserCreateWithoutUploadedLabReportsInput, UserUncheckedCreateWithoutUploadedLabReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedLabReportsInput
    connect?: UserWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutLabReportsNestedInput = {
    create?: XOR<PatientCreateWithoutLabReportsInput, PatientUncheckedCreateWithoutLabReportsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutLabReportsInput
    upsert?: PatientUpsertWithoutLabReportsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutLabReportsInput, PatientUpdateWithoutLabReportsInput>, PatientUncheckedUpdateWithoutLabReportsInput>
  }

  export type DoctorUpdateOneWithoutLabReportsNestedInput = {
    create?: XOR<DoctorCreateWithoutLabReportsInput, DoctorUncheckedCreateWithoutLabReportsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutLabReportsInput
    upsert?: DoctorUpsertWithoutLabReportsInput
    disconnect?: DoctorWhereInput | boolean
    delete?: DoctorWhereInput | boolean
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutLabReportsInput, DoctorUpdateWithoutLabReportsInput>, DoctorUncheckedUpdateWithoutLabReportsInput>
  }

  export type UserUpdateOneRequiredWithoutUploadedLabReportsNestedInput = {
    create?: XOR<UserCreateWithoutUploadedLabReportsInput, UserUncheckedCreateWithoutUploadedLabReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedLabReportsInput
    upsert?: UserUpsertWithoutUploadedLabReportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUploadedLabReportsInput, UserUpdateWithoutUploadedLabReportsInput>, UserUncheckedUpdateWithoutUploadedLabReportsInput>
  }

  export type UserCreateNestedOneWithoutPerformedAuditLogsInput = {
    create?: XOR<UserCreateWithoutPerformedAuditLogsInput, UserUncheckedCreateWithoutPerformedAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPerformedAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTargetAuditLogsInput = {
    create?: XOR<UserCreateWithoutTargetAuditLogsInput, UserUncheckedCreateWithoutTargetAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTargetAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPerformedAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutPerformedAuditLogsInput, UserUncheckedCreateWithoutPerformedAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPerformedAuditLogsInput
    upsert?: UserUpsertWithoutPerformedAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPerformedAuditLogsInput, UserUpdateWithoutPerformedAuditLogsInput>, UserUncheckedUpdateWithoutPerformedAuditLogsInput>
  }

  export type UserUpdateOneWithoutTargetAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutTargetAuditLogsInput, UserUncheckedCreateWithoutTargetAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTargetAuditLogsInput
    upsert?: UserUpsertWithoutTargetAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTargetAuditLogsInput, UserUpdateWithoutTargetAuditLogsInput>, UserUncheckedUpdateWithoutTargetAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserCreateWithoutOffboardedUsersInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    patient?: PatientCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateWithoutOffboardedUsersInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserCreateOrConnectWithoutOffboardedUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOffboardedUsersInput, UserUncheckedCreateWithoutOffboardedUsersInput>
  }

  export type UserCreateWithoutOffboardedByInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    patient?: PatientCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateWithoutOffboardedByInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserCreateOrConnectWithoutOffboardedByInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOffboardedByInput, UserUncheckedCreateWithoutOffboardedByInput>
  }

  export type UserCreateManyOffboardedByInputEnvelope = {
    data: UserCreateManyOffboardedByInput | UserCreateManyOffboardedByInput[]
    skipDuplicates?: boolean
  }

  export type DoctorCreateWithoutUserInput = {
    id?: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
    prescriptions?: PrescriptionCreateNestedManyWithoutDoctorInput
    labReports?: LabReportCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutUserInput = {
    id?: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutDoctorInput
    labReports?: LabReportUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutUserInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
  }

  export type PatientCreateWithoutUserInput = {
    id?: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    triageRecords?: TriageRecordCreateNestedManyWithoutPatientInput
    bills?: BillCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionCreateNestedManyWithoutPatientInput
    labReports?: LabReportCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutUserInput = {
    id?: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    triageRecords?: TriageRecordUncheckedCreateNestedManyWithoutPatientInput
    bills?: BillUncheckedCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
    labReports?: LabReportUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutUserInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
  }

  export type AppointmentCreateWithoutCancelledByInput = {
    id?: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutAppointmentsInput
    doctor: DoctorCreateNestedOneWithoutAppointmentsInput
    prescription?: PrescriptionCreateNestedOneWithoutAppointmentInput
    bills?: BillCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutCancelledByInput = {
    id?: string
    patientId: string
    doctorId: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: string | null
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bills?: BillUncheckedCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutCancelledByInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutCancelledByInput, AppointmentUncheckedCreateWithoutCancelledByInput>
  }

  export type AppointmentCreateManyCancelledByInputEnvelope = {
    data: AppointmentCreateManyCancelledByInput | AppointmentCreateManyCancelledByInput[]
    skipDuplicates?: boolean
  }

  export type TriageRecordCreateWithoutReceptionistInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorReferred?: UserCreateNestedOneWithoutDoctorReferredTriageInput
    patient?: PatientCreateNestedOneWithoutTriageRecordsInput
  }

  export type TriageRecordUncheckedCreateWithoutReceptionistInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    doctorReferredId?: string | null
    patientId?: string | null
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageRecordCreateOrConnectWithoutReceptionistInput = {
    where: TriageRecordWhereUniqueInput
    create: XOR<TriageRecordCreateWithoutReceptionistInput, TriageRecordUncheckedCreateWithoutReceptionistInput>
  }

  export type TriageRecordCreateManyReceptionistInputEnvelope = {
    data: TriageRecordCreateManyReceptionistInput | TriageRecordCreateManyReceptionistInput[]
    skipDuplicates?: boolean
  }

  export type TriageRecordCreateWithoutDoctorReferredInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receptionist: UserCreateNestedOneWithoutReceptionistTriageInput
    patient?: PatientCreateNestedOneWithoutTriageRecordsInput
  }

  export type TriageRecordUncheckedCreateWithoutDoctorReferredInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId: string
    patientId?: string | null
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageRecordCreateOrConnectWithoutDoctorReferredInput = {
    where: TriageRecordWhereUniqueInput
    create: XOR<TriageRecordCreateWithoutDoctorReferredInput, TriageRecordUncheckedCreateWithoutDoctorReferredInput>
  }

  export type TriageRecordCreateManyDoctorReferredInputEnvelope = {
    data: TriageRecordCreateManyDoctorReferredInput | TriageRecordCreateManyDoctorReferredInput[]
    skipDuplicates?: boolean
  }

  export type BillCreateWithoutCreatedByInput = {
    id?: string
    triageId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient?: PatientCreateNestedOneWithoutBillsInput
    appointment?: AppointmentCreateNestedOneWithoutBillsInput
  }

  export type BillUncheckedCreateWithoutCreatedByInput = {
    id?: string
    patientId?: string | null
    triageId?: string | null
    appointmentId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillCreateOrConnectWithoutCreatedByInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutCreatedByInput, BillUncheckedCreateWithoutCreatedByInput>
  }

  export type BillCreateManyCreatedByInputEnvelope = {
    data: BillCreateManyCreatedByInput | BillCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type LabReportCreateWithoutUploadedByInput = {
    id?: string
    testName: string
    testType: string
    reportDate: Date | string
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutLabReportsInput
    doctor?: DoctorCreateNestedOneWithoutLabReportsInput
  }

  export type LabReportUncheckedCreateWithoutUploadedByInput = {
    id?: string
    patientId: string
    testName: string
    testType: string
    reportDate: Date | string
    doctorId?: string | null
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabReportCreateOrConnectWithoutUploadedByInput = {
    where: LabReportWhereUniqueInput
    create: XOR<LabReportCreateWithoutUploadedByInput, LabReportUncheckedCreateWithoutUploadedByInput>
  }

  export type LabReportCreateManyUploadedByInputEnvelope = {
    data: LabReportCreateManyUploadedByInput | LabReportCreateManyUploadedByInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutPerformedByInput = {
    id?: string
    action: string
    details: string
    severity?: string
    ipAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    targetUser?: UserCreateNestedOneWithoutTargetAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutPerformedByInput = {
    id?: string
    action: string
    targetUserId?: string | null
    details: string
    severity?: string
    ipAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutPerformedByInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput>
  }

  export type AuditLogCreateManyPerformedByInputEnvelope = {
    data: AuditLogCreateManyPerformedByInput | AuditLogCreateManyPerformedByInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutTargetUserInput = {
    id?: string
    action: string
    details: string
    severity?: string
    ipAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    performedBy: UserCreateNestedOneWithoutPerformedAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutTargetUserInput = {
    id?: string
    action: string
    performedById: string
    details: string
    severity?: string
    ipAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutTargetUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutTargetUserInput, AuditLogUncheckedCreateWithoutTargetUserInput>
  }

  export type AuditLogCreateManyTargetUserInputEnvelope = {
    data: AuditLogCreateManyTargetUserInput | AuditLogCreateManyTargetUserInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOffboardedUsersInput = {
    update: XOR<UserUpdateWithoutOffboardedUsersInput, UserUncheckedUpdateWithoutOffboardedUsersInput>
    create: XOR<UserCreateWithoutOffboardedUsersInput, UserUncheckedCreateWithoutOffboardedUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOffboardedUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOffboardedUsersInput, UserUncheckedUpdateWithoutOffboardedUsersInput>
  }

  export type UserUpdateWithoutOffboardedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOffboardedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutOffboardedByInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutOffboardedByInput, UserUncheckedUpdateWithoutOffboardedByInput>
    create: XOR<UserCreateWithoutOffboardedByInput, UserUncheckedCreateWithoutOffboardedByInput>
  }

  export type UserUpdateWithWhereUniqueWithoutOffboardedByInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutOffboardedByInput, UserUncheckedUpdateWithoutOffboardedByInput>
  }

  export type UserUpdateManyWithWhereWithoutOffboardedByInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutOffboardedByInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    profile?: JsonFilter<"User">
    isActive?: BoolFilter<"User"> | boolean
    isOffboarded?: BoolFilter<"User"> | boolean
    offboardedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    offboardedById?: StringNullableFilter<"User"> | string | null
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type DoctorUpsertWithoutUserInput = {
    update: XOR<DoctorUpdateWithoutUserInput, DoctorUncheckedUpdateWithoutUserInput>
    create: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutUserInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutUserInput, DoctorUncheckedUpdateWithoutUserInput>
  }

  export type DoctorUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutDoctorNestedInput
    labReports?: LabReportUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutDoctorNestedInput
    labReports?: LabReportUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type PatientUpsertWithoutUserInput = {
    update: XOR<PatientUpdateWithoutUserInput, PatientUncheckedUpdateWithoutUserInput>
    create: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutUserInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutUserInput, PatientUncheckedUpdateWithoutUserInput>
  }

  export type PatientUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    triageRecords?: TriageRecordUpdateManyWithoutPatientNestedInput
    bills?: BillUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    triageRecords?: TriageRecordUncheckedUpdateManyWithoutPatientNestedInput
    bills?: BillUncheckedUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutCancelledByInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutCancelledByInput, AppointmentUncheckedUpdateWithoutCancelledByInput>
    create: XOR<AppointmentCreateWithoutCancelledByInput, AppointmentUncheckedCreateWithoutCancelledByInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutCancelledByInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutCancelledByInput, AppointmentUncheckedUpdateWithoutCancelledByInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutCancelledByInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutCancelledByInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    patientId?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    date?: DateTimeFilter<"Appointment"> | Date | string
    timeSlot?: JsonFilter<"Appointment">
    status?: StringFilter<"Appointment"> | string
    paymentMode?: StringFilter<"Appointment"> | string
    paymentStatus?: StringFilter<"Appointment"> | string
    paymentDetails?: JsonNullableFilter<"Appointment">
    consultationType?: StringFilter<"Appointment"> | string
    symptoms?: StringNullableFilter<"Appointment"> | string | null
    notes?: StringNullableFilter<"Appointment"> | string | null
    patientDocuments?: JsonNullableFilter<"Appointment">
    prescriptionId?: StringNullableFilter<"Appointment"> | string | null
    cancellationReason?: StringNullableFilter<"Appointment"> | string | null
    cancelledById?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type TriageRecordUpsertWithWhereUniqueWithoutReceptionistInput = {
    where: TriageRecordWhereUniqueInput
    update: XOR<TriageRecordUpdateWithoutReceptionistInput, TriageRecordUncheckedUpdateWithoutReceptionistInput>
    create: XOR<TriageRecordCreateWithoutReceptionistInput, TriageRecordUncheckedCreateWithoutReceptionistInput>
  }

  export type TriageRecordUpdateWithWhereUniqueWithoutReceptionistInput = {
    where: TriageRecordWhereUniqueInput
    data: XOR<TriageRecordUpdateWithoutReceptionistInput, TriageRecordUncheckedUpdateWithoutReceptionistInput>
  }

  export type TriageRecordUpdateManyWithWhereWithoutReceptionistInput = {
    where: TriageRecordScalarWhereInput
    data: XOR<TriageRecordUpdateManyMutationInput, TriageRecordUncheckedUpdateManyWithoutReceptionistInput>
  }

  export type TriageRecordScalarWhereInput = {
    AND?: TriageRecordScalarWhereInput | TriageRecordScalarWhereInput[]
    OR?: TriageRecordScalarWhereInput[]
    NOT?: TriageRecordScalarWhereInput | TriageRecordScalarWhereInput[]
    id?: StringFilter<"TriageRecord"> | string
    patientName?: StringFilter<"TriageRecord"> | string
    age?: IntFilter<"TriageRecord"> | number
    gender?: StringFilter<"TriageRecord"> | string
    contactNumber?: StringFilter<"TriageRecord"> | string
    symptoms?: StringFilter<"TriageRecord"> | string
    vitals?: JsonNullableFilter<"TriageRecord">
    aiAnalysis?: JsonNullableFilter<"TriageRecord">
    receptionistId?: StringFilter<"TriageRecord"> | string
    doctorReferredId?: StringNullableFilter<"TriageRecord"> | string | null
    patientId?: StringNullableFilter<"TriageRecord"> | string | null
    status?: StringFilter<"TriageRecord"> | string
    diagnosis?: StringNullableFilter<"TriageRecord"> | string | null
    prescribedMedicines?: JsonNullableFilter<"TriageRecord">
    tests?: JsonNullableFilter<"TriageRecord">
    advice?: StringNullableFilter<"TriageRecord"> | string | null
    followUpDate?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    triageId?: StringFilter<"TriageRecord"> | string
    checkedInAt?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    checkedOutAt?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"TriageRecord"> | Date | string | null
    createdAt?: DateTimeFilter<"TriageRecord"> | Date | string
    updatedAt?: DateTimeFilter<"TriageRecord"> | Date | string
  }

  export type TriageRecordUpsertWithWhereUniqueWithoutDoctorReferredInput = {
    where: TriageRecordWhereUniqueInput
    update: XOR<TriageRecordUpdateWithoutDoctorReferredInput, TriageRecordUncheckedUpdateWithoutDoctorReferredInput>
    create: XOR<TriageRecordCreateWithoutDoctorReferredInput, TriageRecordUncheckedCreateWithoutDoctorReferredInput>
  }

  export type TriageRecordUpdateWithWhereUniqueWithoutDoctorReferredInput = {
    where: TriageRecordWhereUniqueInput
    data: XOR<TriageRecordUpdateWithoutDoctorReferredInput, TriageRecordUncheckedUpdateWithoutDoctorReferredInput>
  }

  export type TriageRecordUpdateManyWithWhereWithoutDoctorReferredInput = {
    where: TriageRecordScalarWhereInput
    data: XOR<TriageRecordUpdateManyMutationInput, TriageRecordUncheckedUpdateManyWithoutDoctorReferredInput>
  }

  export type BillUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: BillWhereUniqueInput
    update: XOR<BillUpdateWithoutCreatedByInput, BillUncheckedUpdateWithoutCreatedByInput>
    create: XOR<BillCreateWithoutCreatedByInput, BillUncheckedCreateWithoutCreatedByInput>
  }

  export type BillUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: BillWhereUniqueInput
    data: XOR<BillUpdateWithoutCreatedByInput, BillUncheckedUpdateWithoutCreatedByInput>
  }

  export type BillUpdateManyWithWhereWithoutCreatedByInput = {
    where: BillScalarWhereInput
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type BillScalarWhereInput = {
    AND?: BillScalarWhereInput | BillScalarWhereInput[]
    OR?: BillScalarWhereInput[]
    NOT?: BillScalarWhereInput | BillScalarWhereInput[]
    id?: StringFilter<"Bill"> | string
    patientId?: StringNullableFilter<"Bill"> | string | null
    triageId?: StringNullableFilter<"Bill"> | string | null
    appointmentId?: StringNullableFilter<"Bill"> | string | null
    items?: JsonFilter<"Bill">
    subtotal?: FloatFilter<"Bill"> | number
    tax?: FloatFilter<"Bill"> | number
    total?: FloatFilter<"Bill"> | number
    status?: StringFilter<"Bill"> | string
    dueDate?: DateTimeNullableFilter<"Bill"> | Date | string | null
    paymentMethod?: StringNullableFilter<"Bill"> | string | null
    paymentDetails?: JsonNullableFilter<"Bill">
    receipt?: StringNullableFilter<"Bill"> | string | null
    createdById?: StringFilter<"Bill"> | string
    createdAt?: DateTimeFilter<"Bill"> | Date | string
    updatedAt?: DateTimeFilter<"Bill"> | Date | string
  }

  export type LabReportUpsertWithWhereUniqueWithoutUploadedByInput = {
    where: LabReportWhereUniqueInput
    update: XOR<LabReportUpdateWithoutUploadedByInput, LabReportUncheckedUpdateWithoutUploadedByInput>
    create: XOR<LabReportCreateWithoutUploadedByInput, LabReportUncheckedCreateWithoutUploadedByInput>
  }

  export type LabReportUpdateWithWhereUniqueWithoutUploadedByInput = {
    where: LabReportWhereUniqueInput
    data: XOR<LabReportUpdateWithoutUploadedByInput, LabReportUncheckedUpdateWithoutUploadedByInput>
  }

  export type LabReportUpdateManyWithWhereWithoutUploadedByInput = {
    where: LabReportScalarWhereInput
    data: XOR<LabReportUpdateManyMutationInput, LabReportUncheckedUpdateManyWithoutUploadedByInput>
  }

  export type LabReportScalarWhereInput = {
    AND?: LabReportScalarWhereInput | LabReportScalarWhereInput[]
    OR?: LabReportScalarWhereInput[]
    NOT?: LabReportScalarWhereInput | LabReportScalarWhereInput[]
    id?: StringFilter<"LabReport"> | string
    patientId?: StringFilter<"LabReport"> | string
    testName?: StringFilter<"LabReport"> | string
    testType?: StringFilter<"LabReport"> | string
    reportDate?: DateTimeFilter<"LabReport"> | Date | string
    doctorId?: StringNullableFilter<"LabReport"> | string | null
    results?: JsonFilter<"LabReport">
    conclusion?: StringNullableFilter<"LabReport"> | string | null
    recommendations?: StringNullableFilter<"LabReport"> | string | null
    reportFile?: StringFilter<"LabReport"> | string
    uploadedById?: StringFilter<"LabReport"> | string
    createdAt?: DateTimeFilter<"LabReport"> | Date | string
    updatedAt?: DateTimeFilter<"LabReport"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutPerformedByInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutPerformedByInput, AuditLogUncheckedUpdateWithoutPerformedByInput>
    create: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutPerformedByInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutPerformedByInput, AuditLogUncheckedUpdateWithoutPerformedByInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutPerformedByInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutPerformedByInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    performedById?: StringFilter<"AuditLog"> | string
    targetUserId?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringFilter<"AuditLog"> | string
    severity?: StringFilter<"AuditLog"> | string
    ipAddress?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    updatedAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutTargetUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutTargetUserInput, AuditLogUncheckedUpdateWithoutTargetUserInput>
    create: XOR<AuditLogCreateWithoutTargetUserInput, AuditLogUncheckedCreateWithoutTargetUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutTargetUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutTargetUserInput, AuditLogUncheckedUpdateWithoutTargetUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutTargetUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutTargetUserInput>
  }

  export type UserCreateWithoutDoctorInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    patient?: PatientCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateWithoutDoctorInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserCreateOrConnectWithoutDoctorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentCreateWithoutDoctorInput = {
    id?: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutAppointmentsInput
    prescription?: PrescriptionCreateNestedOneWithoutAppointmentInput
    cancelledBy?: UserCreateNestedOneWithoutCancelledAppointmentsInput
    bills?: BillCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutDoctorInput = {
    id?: string
    patientId: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: string | null
    cancellationReason?: string | null
    cancelledById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bills?: BillUncheckedCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentCreateManyDoctorInputEnvelope = {
    data: AppointmentCreateManyDoctorInput | AppointmentCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type PrescriptionCreateWithoutDoctorInput = {
    id?: string
    appointmentId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentCreateNestedOneWithoutPrescriptionInput
    patient: PatientCreateNestedOneWithoutPrescriptionsInput
  }

  export type PrescriptionUncheckedCreateWithoutDoctorInput = {
    id?: string
    appointmentId: string
    patientId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentUncheckedCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionCreateOrConnectWithoutDoctorInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput>
  }

  export type PrescriptionCreateManyDoctorInputEnvelope = {
    data: PrescriptionCreateManyDoctorInput | PrescriptionCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type LabReportCreateWithoutDoctorInput = {
    id?: string
    testName: string
    testType: string
    reportDate: Date | string
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutLabReportsInput
    uploadedBy: UserCreateNestedOneWithoutUploadedLabReportsInput
  }

  export type LabReportUncheckedCreateWithoutDoctorInput = {
    id?: string
    patientId: string
    testName: string
    testType: string
    reportDate: Date | string
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabReportCreateOrConnectWithoutDoctorInput = {
    where: LabReportWhereUniqueInput
    create: XOR<LabReportCreateWithoutDoctorInput, LabReportUncheckedCreateWithoutDoctorInput>
  }

  export type LabReportCreateManyDoctorInputEnvelope = {
    data: LabReportCreateManyDoctorInput | LabReportCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDoctorInput = {
    update: XOR<UserUpdateWithoutDoctorInput, UserUncheckedUpdateWithoutDoctorInput>
    create: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoctorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoctorInput, UserUncheckedUpdateWithoutDoctorInput>
  }

  export type UserUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutDoctorInput, AppointmentUncheckedUpdateWithoutDoctorInput>
    create: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutDoctorInput, AppointmentUncheckedUpdateWithoutDoctorInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutDoctorInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutDoctorInput>
  }

  export type PrescriptionUpsertWithWhereUniqueWithoutDoctorInput = {
    where: PrescriptionWhereUniqueInput
    update: XOR<PrescriptionUpdateWithoutDoctorInput, PrescriptionUncheckedUpdateWithoutDoctorInput>
    create: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput>
  }

  export type PrescriptionUpdateWithWhereUniqueWithoutDoctorInput = {
    where: PrescriptionWhereUniqueInput
    data: XOR<PrescriptionUpdateWithoutDoctorInput, PrescriptionUncheckedUpdateWithoutDoctorInput>
  }

  export type PrescriptionUpdateManyWithWhereWithoutDoctorInput = {
    where: PrescriptionScalarWhereInput
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyWithoutDoctorInput>
  }

  export type PrescriptionScalarWhereInput = {
    AND?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
    OR?: PrescriptionScalarWhereInput[]
    NOT?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
    id?: StringFilter<"Prescription"> | string
    appointmentId?: StringFilter<"Prescription"> | string
    patientId?: StringFilter<"Prescription"> | string
    doctorId?: StringFilter<"Prescription"> | string
    diagnosis?: StringFilter<"Prescription"> | string
    medicines?: JsonFilter<"Prescription">
    tests?: JsonNullableFilter<"Prescription">
    advice?: StringNullableFilter<"Prescription"> | string | null
    followUpDate?: DateTimeNullableFilter<"Prescription"> | Date | string | null
    receipt?: StringNullableFilter<"Prescription"> | string | null
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
  }

  export type LabReportUpsertWithWhereUniqueWithoutDoctorInput = {
    where: LabReportWhereUniqueInput
    update: XOR<LabReportUpdateWithoutDoctorInput, LabReportUncheckedUpdateWithoutDoctorInput>
    create: XOR<LabReportCreateWithoutDoctorInput, LabReportUncheckedCreateWithoutDoctorInput>
  }

  export type LabReportUpdateWithWhereUniqueWithoutDoctorInput = {
    where: LabReportWhereUniqueInput
    data: XOR<LabReportUpdateWithoutDoctorInput, LabReportUncheckedUpdateWithoutDoctorInput>
  }

  export type LabReportUpdateManyWithWhereWithoutDoctorInput = {
    where: LabReportScalarWhereInput
    data: XOR<LabReportUpdateManyMutationInput, LabReportUncheckedUpdateManyWithoutDoctorInput>
  }

  export type UserCreateWithoutPatientInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateWithoutPatientInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserCreateOrConnectWithoutPatientInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateWithoutPatientInput = {
    id?: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor: DoctorCreateNestedOneWithoutAppointmentsInput
    prescription?: PrescriptionCreateNestedOneWithoutAppointmentInput
    cancelledBy?: UserCreateNestedOneWithoutCancelledAppointmentsInput
    bills?: BillCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutPatientInput = {
    id?: string
    doctorId: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: string | null
    cancellationReason?: string | null
    cancelledById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bills?: BillUncheckedCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateManyPatientInputEnvelope = {
    data: AppointmentCreateManyPatientInput | AppointmentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type TriageRecordCreateWithoutPatientInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receptionist: UserCreateNestedOneWithoutReceptionistTriageInput
    doctorReferred?: UserCreateNestedOneWithoutDoctorReferredTriageInput
  }

  export type TriageRecordUncheckedCreateWithoutPatientInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId: string
    doctorReferredId?: string | null
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageRecordCreateOrConnectWithoutPatientInput = {
    where: TriageRecordWhereUniqueInput
    create: XOR<TriageRecordCreateWithoutPatientInput, TriageRecordUncheckedCreateWithoutPatientInput>
  }

  export type TriageRecordCreateManyPatientInputEnvelope = {
    data: TriageRecordCreateManyPatientInput | TriageRecordCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type BillCreateWithoutPatientInput = {
    id?: string
    triageId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentCreateNestedOneWithoutBillsInput
    createdBy: UserCreateNestedOneWithoutCreatedBillsInput
  }

  export type BillUncheckedCreateWithoutPatientInput = {
    id?: string
    triageId?: string | null
    appointmentId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillCreateOrConnectWithoutPatientInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput>
  }

  export type BillCreateManyPatientInputEnvelope = {
    data: BillCreateManyPatientInput | BillCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type PrescriptionCreateWithoutPatientInput = {
    id?: string
    appointmentId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentCreateNestedOneWithoutPrescriptionInput
    doctor: DoctorCreateNestedOneWithoutPrescriptionsInput
  }

  export type PrescriptionUncheckedCreateWithoutPatientInput = {
    id?: string
    appointmentId: string
    doctorId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentUncheckedCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionCreateOrConnectWithoutPatientInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput>
  }

  export type PrescriptionCreateManyPatientInputEnvelope = {
    data: PrescriptionCreateManyPatientInput | PrescriptionCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type LabReportCreateWithoutPatientInput = {
    id?: string
    testName: string
    testType: string
    reportDate: Date | string
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor?: DoctorCreateNestedOneWithoutLabReportsInput
    uploadedBy: UserCreateNestedOneWithoutUploadedLabReportsInput
  }

  export type LabReportUncheckedCreateWithoutPatientInput = {
    id?: string
    testName: string
    testType: string
    reportDate: Date | string
    doctorId?: string | null
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabReportCreateOrConnectWithoutPatientInput = {
    where: LabReportWhereUniqueInput
    create: XOR<LabReportCreateWithoutPatientInput, LabReportUncheckedCreateWithoutPatientInput>
  }

  export type LabReportCreateManyPatientInputEnvelope = {
    data: LabReportCreateManyPatientInput | LabReportCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPatientInput = {
    update: XOR<UserUpdateWithoutPatientInput, UserUncheckedUpdateWithoutPatientInput>
    create: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientInput, UserUncheckedUpdateWithoutPatientInput>
  }

  export type UserUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPatientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type TriageRecordUpsertWithWhereUniqueWithoutPatientInput = {
    where: TriageRecordWhereUniqueInput
    update: XOR<TriageRecordUpdateWithoutPatientInput, TriageRecordUncheckedUpdateWithoutPatientInput>
    create: XOR<TriageRecordCreateWithoutPatientInput, TriageRecordUncheckedCreateWithoutPatientInput>
  }

  export type TriageRecordUpdateWithWhereUniqueWithoutPatientInput = {
    where: TriageRecordWhereUniqueInput
    data: XOR<TriageRecordUpdateWithoutPatientInput, TriageRecordUncheckedUpdateWithoutPatientInput>
  }

  export type TriageRecordUpdateManyWithWhereWithoutPatientInput = {
    where: TriageRecordScalarWhereInput
    data: XOR<TriageRecordUpdateManyMutationInput, TriageRecordUncheckedUpdateManyWithoutPatientInput>
  }

  export type BillUpsertWithWhereUniqueWithoutPatientInput = {
    where: BillWhereUniqueInput
    update: XOR<BillUpdateWithoutPatientInput, BillUncheckedUpdateWithoutPatientInput>
    create: XOR<BillCreateWithoutPatientInput, BillUncheckedCreateWithoutPatientInput>
  }

  export type BillUpdateWithWhereUniqueWithoutPatientInput = {
    where: BillWhereUniqueInput
    data: XOR<BillUpdateWithoutPatientInput, BillUncheckedUpdateWithoutPatientInput>
  }

  export type BillUpdateManyWithWhereWithoutPatientInput = {
    where: BillScalarWhereInput
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyWithoutPatientInput>
  }

  export type PrescriptionUpsertWithWhereUniqueWithoutPatientInput = {
    where: PrescriptionWhereUniqueInput
    update: XOR<PrescriptionUpdateWithoutPatientInput, PrescriptionUncheckedUpdateWithoutPatientInput>
    create: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput>
  }

  export type PrescriptionUpdateWithWhereUniqueWithoutPatientInput = {
    where: PrescriptionWhereUniqueInput
    data: XOR<PrescriptionUpdateWithoutPatientInput, PrescriptionUncheckedUpdateWithoutPatientInput>
  }

  export type PrescriptionUpdateManyWithWhereWithoutPatientInput = {
    where: PrescriptionScalarWhereInput
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyWithoutPatientInput>
  }

  export type LabReportUpsertWithWhereUniqueWithoutPatientInput = {
    where: LabReportWhereUniqueInput
    update: XOR<LabReportUpdateWithoutPatientInput, LabReportUncheckedUpdateWithoutPatientInput>
    create: XOR<LabReportCreateWithoutPatientInput, LabReportUncheckedCreateWithoutPatientInput>
  }

  export type LabReportUpdateWithWhereUniqueWithoutPatientInput = {
    where: LabReportWhereUniqueInput
    data: XOR<LabReportUpdateWithoutPatientInput, LabReportUncheckedUpdateWithoutPatientInput>
  }

  export type LabReportUpdateManyWithWhereWithoutPatientInput = {
    where: LabReportScalarWhereInput
    data: XOR<LabReportUpdateManyMutationInput, LabReportUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientCreateWithoutAppointmentsInput = {
    id?: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPatientInput
    triageRecords?: TriageRecordCreateNestedManyWithoutPatientInput
    bills?: BillCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionCreateNestedManyWithoutPatientInput
    labReports?: LabReportCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    userId: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    triageRecords?: TriageRecordUncheckedCreateNestedManyWithoutPatientInput
    bills?: BillUncheckedCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
    labReports?: LabReportUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutAppointmentsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
  }

  export type DoctorCreateWithoutAppointmentsInput = {
    id?: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDoctorInput
    prescriptions?: PrescriptionCreateNestedManyWithoutDoctorInput
    labReports?: LabReportCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    userId: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutDoctorInput
    labReports?: LabReportUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutAppointmentsInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutAppointmentsInput, DoctorUncheckedCreateWithoutAppointmentsInput>
  }

  export type PrescriptionCreateWithoutAppointmentInput = {
    id?: string
    appointmentId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutPrescriptionsInput
    doctor: DoctorCreateNestedOneWithoutPrescriptionsInput
  }

  export type PrescriptionUncheckedCreateWithoutAppointmentInput = {
    id?: string
    appointmentId: string
    patientId: string
    doctorId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionCreateOrConnectWithoutAppointmentInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutAppointmentInput, PrescriptionUncheckedCreateWithoutAppointmentInput>
  }

  export type UserCreateWithoutCancelledAppointmentsInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    patient?: PatientCreateNestedOneWithoutUserInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateWithoutCancelledAppointmentsInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserCreateOrConnectWithoutCancelledAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCancelledAppointmentsInput, UserUncheckedCreateWithoutCancelledAppointmentsInput>
  }

  export type BillCreateWithoutAppointmentInput = {
    id?: string
    triageId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient?: PatientCreateNestedOneWithoutBillsInput
    createdBy: UserCreateNestedOneWithoutCreatedBillsInput
  }

  export type BillUncheckedCreateWithoutAppointmentInput = {
    id?: string
    patientId?: string | null
    triageId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillCreateOrConnectWithoutAppointmentInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutAppointmentInput, BillUncheckedCreateWithoutAppointmentInput>
  }

  export type BillCreateManyAppointmentInputEnvelope = {
    data: BillCreateManyAppointmentInput | BillCreateManyAppointmentInput[]
    skipDuplicates?: boolean
  }

  export type PatientUpsertWithoutAppointmentsInput = {
    update: XOR<PatientUpdateWithoutAppointmentsInput, PatientUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutAppointmentsInput, PatientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PatientUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPatientNestedInput
    triageRecords?: TriageRecordUpdateManyWithoutPatientNestedInput
    bills?: BillUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    triageRecords?: TriageRecordUncheckedUpdateManyWithoutPatientNestedInput
    bills?: BillUncheckedUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type DoctorUpsertWithoutAppointmentsInput = {
    update: XOR<DoctorUpdateWithoutAppointmentsInput, DoctorUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<DoctorCreateWithoutAppointmentsInput, DoctorUncheckedCreateWithoutAppointmentsInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutAppointmentsInput, DoctorUncheckedUpdateWithoutAppointmentsInput>
  }

  export type DoctorUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutDoctorNestedInput
    labReports?: LabReportUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutDoctorNestedInput
    labReports?: LabReportUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type PrescriptionUpsertWithoutAppointmentInput = {
    update: XOR<PrescriptionUpdateWithoutAppointmentInput, PrescriptionUncheckedUpdateWithoutAppointmentInput>
    create: XOR<PrescriptionCreateWithoutAppointmentInput, PrescriptionUncheckedCreateWithoutAppointmentInput>
    where?: PrescriptionWhereInput
  }

  export type PrescriptionUpdateToOneWithWhereWithoutAppointmentInput = {
    where?: PrescriptionWhereInput
    data: XOR<PrescriptionUpdateWithoutAppointmentInput, PrescriptionUncheckedUpdateWithoutAppointmentInput>
  }

  export type PrescriptionUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutPrescriptionsNestedInput
    doctor?: DoctorUpdateOneRequiredWithoutPrescriptionsNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCancelledAppointmentsInput = {
    update: XOR<UserUpdateWithoutCancelledAppointmentsInput, UserUncheckedUpdateWithoutCancelledAppointmentsInput>
    create: XOR<UserCreateWithoutCancelledAppointmentsInput, UserUncheckedCreateWithoutCancelledAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCancelledAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCancelledAppointmentsInput, UserUncheckedUpdateWithoutCancelledAppointmentsInput>
  }

  export type UserUpdateWithoutCancelledAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCancelledAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type BillUpsertWithWhereUniqueWithoutAppointmentInput = {
    where: BillWhereUniqueInput
    update: XOR<BillUpdateWithoutAppointmentInput, BillUncheckedUpdateWithoutAppointmentInput>
    create: XOR<BillCreateWithoutAppointmentInput, BillUncheckedCreateWithoutAppointmentInput>
  }

  export type BillUpdateWithWhereUniqueWithoutAppointmentInput = {
    where: BillWhereUniqueInput
    data: XOR<BillUpdateWithoutAppointmentInput, BillUncheckedUpdateWithoutAppointmentInput>
  }

  export type BillUpdateManyWithWhereWithoutAppointmentInput = {
    where: BillScalarWhereInput
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyWithoutAppointmentInput>
  }

  export type UserCreateWithoutReceptionistTriageInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    patient?: PatientCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateWithoutReceptionistTriageInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserCreateOrConnectWithoutReceptionistTriageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceptionistTriageInput, UserUncheckedCreateWithoutReceptionistTriageInput>
  }

  export type UserCreateWithoutDoctorReferredTriageInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    patient?: PatientCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateWithoutDoctorReferredTriageInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserCreateOrConnectWithoutDoctorReferredTriageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoctorReferredTriageInput, UserUncheckedCreateWithoutDoctorReferredTriageInput>
  }

  export type PatientCreateWithoutTriageRecordsInput = {
    id?: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    bills?: BillCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionCreateNestedManyWithoutPatientInput
    labReports?: LabReportCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutTriageRecordsInput = {
    id?: string
    userId: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    bills?: BillUncheckedCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
    labReports?: LabReportUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutTriageRecordsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutTriageRecordsInput, PatientUncheckedCreateWithoutTriageRecordsInput>
  }

  export type UserUpsertWithoutReceptionistTriageInput = {
    update: XOR<UserUpdateWithoutReceptionistTriageInput, UserUncheckedUpdateWithoutReceptionistTriageInput>
    create: XOR<UserCreateWithoutReceptionistTriageInput, UserUncheckedCreateWithoutReceptionistTriageInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceptionistTriageInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceptionistTriageInput, UserUncheckedUpdateWithoutReceptionistTriageInput>
  }

  export type UserUpdateWithoutReceptionistTriageInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceptionistTriageInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUpsertWithoutDoctorReferredTriageInput = {
    update: XOR<UserUpdateWithoutDoctorReferredTriageInput, UserUncheckedUpdateWithoutDoctorReferredTriageInput>
    create: XOR<UserCreateWithoutDoctorReferredTriageInput, UserUncheckedCreateWithoutDoctorReferredTriageInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoctorReferredTriageInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoctorReferredTriageInput, UserUncheckedUpdateWithoutDoctorReferredTriageInput>
  }

  export type UserUpdateWithoutDoctorReferredTriageInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDoctorReferredTriageInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type PatientUpsertWithoutTriageRecordsInput = {
    update: XOR<PatientUpdateWithoutTriageRecordsInput, PatientUncheckedUpdateWithoutTriageRecordsInput>
    create: XOR<PatientCreateWithoutTriageRecordsInput, PatientUncheckedCreateWithoutTriageRecordsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutTriageRecordsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutTriageRecordsInput, PatientUncheckedUpdateWithoutTriageRecordsInput>
  }

  export type PatientUpdateWithoutTriageRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    bills?: BillUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutTriageRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    bills?: BillUncheckedUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateWithoutBillsInput = {
    id?: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    triageRecords?: TriageRecordCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionCreateNestedManyWithoutPatientInput
    labReports?: LabReportCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutBillsInput = {
    id?: string
    userId: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    triageRecords?: TriageRecordUncheckedCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
    labReports?: LabReportUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutBillsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutBillsInput, PatientUncheckedCreateWithoutBillsInput>
  }

  export type AppointmentCreateWithoutBillsInput = {
    id?: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutAppointmentsInput
    doctor: DoctorCreateNestedOneWithoutAppointmentsInput
    prescription?: PrescriptionCreateNestedOneWithoutAppointmentInput
    cancelledBy?: UserCreateNestedOneWithoutCancelledAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutBillsInput = {
    id?: string
    patientId: string
    doctorId: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: string | null
    cancellationReason?: string | null
    cancelledById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutBillsInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutBillsInput, AppointmentUncheckedCreateWithoutBillsInput>
  }

  export type UserCreateWithoutCreatedBillsInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    patient?: PatientCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateWithoutCreatedBillsInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserCreateOrConnectWithoutCreatedBillsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedBillsInput, UserUncheckedCreateWithoutCreatedBillsInput>
  }

  export type PatientUpsertWithoutBillsInput = {
    update: XOR<PatientUpdateWithoutBillsInput, PatientUncheckedUpdateWithoutBillsInput>
    create: XOR<PatientCreateWithoutBillsInput, PatientUncheckedCreateWithoutBillsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutBillsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutBillsInput, PatientUncheckedUpdateWithoutBillsInput>
  }

  export type PatientUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    triageRecords?: TriageRecordUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    triageRecords?: TriageRecordUncheckedUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type AppointmentUpsertWithoutBillsInput = {
    update: XOR<AppointmentUpdateWithoutBillsInput, AppointmentUncheckedUpdateWithoutBillsInput>
    create: XOR<AppointmentCreateWithoutBillsInput, AppointmentUncheckedCreateWithoutBillsInput>
    where?: AppointmentWhereInput
  }

  export type AppointmentUpdateToOneWithWhereWithoutBillsInput = {
    where?: AppointmentWhereInput
    data: XOR<AppointmentUpdateWithoutBillsInput, AppointmentUncheckedUpdateWithoutBillsInput>
  }

  export type AppointmentUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentsNestedInput
    prescription?: PrescriptionUpdateOneWithoutAppointmentNestedInput
    cancelledBy?: UserUpdateOneWithoutCancelledAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCreatedBillsInput = {
    update: XOR<UserUpdateWithoutCreatedBillsInput, UserUncheckedUpdateWithoutCreatedBillsInput>
    create: XOR<UserCreateWithoutCreatedBillsInput, UserUncheckedCreateWithoutCreatedBillsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedBillsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedBillsInput, UserUncheckedUpdateWithoutCreatedBillsInput>
  }

  export type UserUpdateWithoutCreatedBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type AppointmentCreateWithoutPrescriptionInput = {
    id?: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutAppointmentsInput
    doctor: DoctorCreateNestedOneWithoutAppointmentsInput
    cancelledBy?: UserCreateNestedOneWithoutCancelledAppointmentsInput
    bills?: BillCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutPrescriptionInput = {
    id?: string
    patientId: string
    doctorId: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: string | null
    cancelledById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bills?: BillUncheckedCreateNestedManyWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutPrescriptionInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPrescriptionInput, AppointmentUncheckedCreateWithoutPrescriptionInput>
  }

  export type PatientCreateWithoutPrescriptionsInput = {
    id?: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    triageRecords?: TriageRecordCreateNestedManyWithoutPatientInput
    bills?: BillCreateNestedManyWithoutPatientInput
    labReports?: LabReportCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutPrescriptionsInput = {
    id?: string
    userId: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    triageRecords?: TriageRecordUncheckedCreateNestedManyWithoutPatientInput
    bills?: BillUncheckedCreateNestedManyWithoutPatientInput
    labReports?: LabReportUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutPrescriptionsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutPrescriptionsInput, PatientUncheckedCreateWithoutPrescriptionsInput>
  }

  export type DoctorCreateWithoutPrescriptionsInput = {
    id?: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDoctorInput
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
    labReports?: LabReportCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutPrescriptionsInput = {
    id?: string
    userId: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    labReports?: LabReportUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutPrescriptionsInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutPrescriptionsInput, DoctorUncheckedCreateWithoutPrescriptionsInput>
  }

  export type AppointmentUpsertWithoutPrescriptionInput = {
    update: XOR<AppointmentUpdateWithoutPrescriptionInput, AppointmentUncheckedUpdateWithoutPrescriptionInput>
    create: XOR<AppointmentCreateWithoutPrescriptionInput, AppointmentUncheckedCreateWithoutPrescriptionInput>
    where?: AppointmentWhereInput
  }

  export type AppointmentUpdateToOneWithWhereWithoutPrescriptionInput = {
    where?: AppointmentWhereInput
    data: XOR<AppointmentUpdateWithoutPrescriptionInput, AppointmentUncheckedUpdateWithoutPrescriptionInput>
  }

  export type AppointmentUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentsNestedInput
    cancelledBy?: UserUpdateOneWithoutCancelledAppointmentsNestedInput
    bills?: BillUpdateManyWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUncheckedUpdateManyWithoutAppointmentNestedInput
  }

  export type PatientUpsertWithoutPrescriptionsInput = {
    update: XOR<PatientUpdateWithoutPrescriptionsInput, PatientUncheckedUpdateWithoutPrescriptionsInput>
    create: XOR<PatientCreateWithoutPrescriptionsInput, PatientUncheckedCreateWithoutPrescriptionsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutPrescriptionsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutPrescriptionsInput, PatientUncheckedUpdateWithoutPrescriptionsInput>
  }

  export type PatientUpdateWithoutPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    triageRecords?: TriageRecordUpdateManyWithoutPatientNestedInput
    bills?: BillUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    triageRecords?: TriageRecordUncheckedUpdateManyWithoutPatientNestedInput
    bills?: BillUncheckedUpdateManyWithoutPatientNestedInput
    labReports?: LabReportUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type DoctorUpsertWithoutPrescriptionsInput = {
    update: XOR<DoctorUpdateWithoutPrescriptionsInput, DoctorUncheckedUpdateWithoutPrescriptionsInput>
    create: XOR<DoctorCreateWithoutPrescriptionsInput, DoctorUncheckedCreateWithoutPrescriptionsInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutPrescriptionsInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutPrescriptionsInput, DoctorUncheckedUpdateWithoutPrescriptionsInput>
  }

  export type DoctorUpdateWithoutPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    labReports?: LabReportUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutPrescriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    labReports?: LabReportUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type PatientCreateWithoutLabReportsInput = {
    id?: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    triageRecords?: TriageRecordCreateNestedManyWithoutPatientInput
    bills?: BillCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutLabReportsInput = {
    id?: string
    userId: string
    medicalRecordNumber: string
    medicalHistory: JsonNullValueInput | InputJsonValue
    allergies: JsonNullValueInput | InputJsonValue
    medications: JsonNullValueInput | InputJsonValue
    emergencyContact: JsonNullValueInput | InputJsonValue
    bloodGroup?: string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    triageRecords?: TriageRecordUncheckedCreateNestedManyWithoutPatientInput
    bills?: BillUncheckedCreateNestedManyWithoutPatientInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutLabReportsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutLabReportsInput, PatientUncheckedCreateWithoutLabReportsInput>
  }

  export type DoctorCreateWithoutLabReportsInput = {
    id?: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDoctorInput
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
    prescriptions?: PrescriptionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutLabReportsInput = {
    id?: string
    userId: string
    name?: string
    specialization: string
    qualifications: string
    experience: number
    licenseNumber: string
    consultationFee: number
    availability: JsonNullValueInput | InputJsonValue
    isAvailable?: boolean
    dutyStatus?: string
    rating: JsonNullValueInput | InputJsonValue
    department: string
    leaves: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    prescriptions?: PrescriptionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutLabReportsInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutLabReportsInput, DoctorUncheckedCreateWithoutLabReportsInput>
  }

  export type UserCreateWithoutUploadedLabReportsInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    patient?: PatientCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateWithoutUploadedLabReportsInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserCreateOrConnectWithoutUploadedLabReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUploadedLabReportsInput, UserUncheckedCreateWithoutUploadedLabReportsInput>
  }

  export type PatientUpsertWithoutLabReportsInput = {
    update: XOR<PatientUpdateWithoutLabReportsInput, PatientUncheckedUpdateWithoutLabReportsInput>
    create: XOR<PatientCreateWithoutLabReportsInput, PatientUncheckedCreateWithoutLabReportsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutLabReportsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutLabReportsInput, PatientUncheckedUpdateWithoutLabReportsInput>
  }

  export type PatientUpdateWithoutLabReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    triageRecords?: TriageRecordUpdateManyWithoutPatientNestedInput
    bills?: BillUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutLabReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    medicalRecordNumber?: StringFieldUpdateOperationsInput | string
    medicalHistory?: JsonNullValueInput | InputJsonValue
    allergies?: JsonNullValueInput | InputJsonValue
    medications?: JsonNullValueInput | InputJsonValue
    emergencyContact?: JsonNullValueInput | InputJsonValue
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceInfo?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    triageRecords?: TriageRecordUncheckedUpdateManyWithoutPatientNestedInput
    bills?: BillUncheckedUpdateManyWithoutPatientNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type DoctorUpsertWithoutLabReportsInput = {
    update: XOR<DoctorUpdateWithoutLabReportsInput, DoctorUncheckedUpdateWithoutLabReportsInput>
    create: XOR<DoctorCreateWithoutLabReportsInput, DoctorUncheckedCreateWithoutLabReportsInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutLabReportsInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutLabReportsInput, DoctorUncheckedUpdateWithoutLabReportsInput>
  }

  export type DoctorUpdateWithoutLabReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    prescriptions?: PrescriptionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutLabReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: StringFieldUpdateOperationsInput | string
    qualifications?: StringFieldUpdateOperationsInput | string
    experience?: IntFieldUpdateOperationsInput | number
    licenseNumber?: StringFieldUpdateOperationsInput | string
    consultationFee?: FloatFieldUpdateOperationsInput | number
    availability?: JsonNullValueInput | InputJsonValue
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    dutyStatus?: StringFieldUpdateOperationsInput | string
    rating?: JsonNullValueInput | InputJsonValue
    department?: StringFieldUpdateOperationsInput | string
    leaves?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    prescriptions?: PrescriptionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type UserUpsertWithoutUploadedLabReportsInput = {
    update: XOR<UserUpdateWithoutUploadedLabReportsInput, UserUncheckedUpdateWithoutUploadedLabReportsInput>
    create: XOR<UserCreateWithoutUploadedLabReportsInput, UserUncheckedCreateWithoutUploadedLabReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUploadedLabReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUploadedLabReportsInput, UserUncheckedUpdateWithoutUploadedLabReportsInput>
  }

  export type UserUpdateWithoutUploadedLabReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUploadedLabReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type UserCreateWithoutPerformedAuditLogsInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    patient?: PatientCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    targetAuditLogs?: AuditLogCreateNestedManyWithoutTargetUserInput
  }

  export type UserUncheckedCreateWithoutPerformedAuditLogsInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    targetAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutTargetUserInput
  }

  export type UserCreateOrConnectWithoutPerformedAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPerformedAuditLogsInput, UserUncheckedCreateWithoutPerformedAuditLogsInput>
  }

  export type UserCreateWithoutTargetAuditLogsInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedBy?: UserCreateNestedOneWithoutOffboardedUsersInput
    offboardedUsers?: UserCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
    patient?: PatientCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
  }

  export type UserUncheckedCreateWithoutTargetAuditLogsInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    offboardedById?: string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    offboardedUsers?: UserUncheckedCreateNestedManyWithoutOffboardedByInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    cancelledAppointments?: AppointmentUncheckedCreateNestedManyWithoutCancelledByInput
    receptionistTriage?: TriageRecordUncheckedCreateNestedManyWithoutReceptionistInput
    doctorReferredTriage?: TriageRecordUncheckedCreateNestedManyWithoutDoctorReferredInput
    createdBills?: BillUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedLabReports?: LabReportUncheckedCreateNestedManyWithoutUploadedByInput
    performedAuditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
  }

  export type UserCreateOrConnectWithoutTargetAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTargetAuditLogsInput, UserUncheckedCreateWithoutTargetAuditLogsInput>
  }

  export type UserUpsertWithoutPerformedAuditLogsInput = {
    update: XOR<UserUpdateWithoutPerformedAuditLogsInput, UserUncheckedUpdateWithoutPerformedAuditLogsInput>
    create: XOR<UserCreateWithoutPerformedAuditLogsInput, UserUncheckedCreateWithoutPerformedAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPerformedAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPerformedAuditLogsInput, UserUncheckedUpdateWithoutPerformedAuditLogsInput>
  }

  export type UserUpdateWithoutPerformedAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPerformedAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUpsertWithoutTargetAuditLogsInput = {
    update: XOR<UserUpdateWithoutTargetAuditLogsInput, UserUncheckedUpdateWithoutTargetAuditLogsInput>
    create: XOR<UserCreateWithoutTargetAuditLogsInput, UserUncheckedCreateWithoutTargetAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTargetAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTargetAuditLogsInput, UserUncheckedUpdateWithoutTargetAuditLogsInput>
  }

  export type UserUpdateWithoutTargetAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedBy?: UserUpdateOneWithoutOffboardedUsersNestedInput
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
  }

  export type UserUncheckedUpdateWithoutTargetAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offboardedById?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
  }

  export type UserCreateManyOffboardedByInput = {
    id?: string
    email: string
    password: string
    role: string
    profile: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isOffboarded?: boolean
    offboardedAt?: Date | string | null
    lastLogin?: Date | string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyCancelledByInput = {
    id?: string
    patientId: string
    doctorId: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: string | null
    cancellationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageRecordCreateManyReceptionistInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    doctorReferredId?: string | null
    patientId?: string | null
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageRecordCreateManyDoctorReferredInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId: string
    patientId?: string | null
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillCreateManyCreatedByInput = {
    id?: string
    patientId?: string | null
    triageId?: string | null
    appointmentId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabReportCreateManyUploadedByInput = {
    id?: string
    patientId: string
    testName: string
    testType: string
    reportDate: Date | string
    doctorId?: string | null
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyPerformedByInput = {
    id?: string
    action: string
    targetUserId?: string | null
    details: string
    severity?: string
    ipAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyTargetUserInput = {
    id?: string
    action: string
    performedById: string
    details: string
    severity?: string
    ipAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutOffboardedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
    patient?: PatientUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOffboardedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offboardedUsers?: UserUncheckedUpdateManyWithoutOffboardedByNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    cancelledAppointments?: AppointmentUncheckedUpdateManyWithoutCancelledByNestedInput
    receptionistTriage?: TriageRecordUncheckedUpdateManyWithoutReceptionistNestedInput
    doctorReferredTriage?: TriageRecordUncheckedUpdateManyWithoutDoctorReferredNestedInput
    createdBills?: BillUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedLabReports?: LabReportUncheckedUpdateManyWithoutUploadedByNestedInput
    performedAuditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
    targetAuditLogs?: AuditLogUncheckedUpdateManyWithoutTargetUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutOffboardedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    profile?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isOffboarded?: BoolFieldUpdateOperationsInput | boolean
    offboardedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutCancelledByInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentsNestedInput
    prescription?: PrescriptionUpdateOneWithoutAppointmentNestedInput
    bills?: BillUpdateManyWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutCancelledByInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUncheckedUpdateManyWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateManyWithoutCancelledByInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageRecordUpdateWithoutReceptionistInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorReferred?: UserUpdateOneWithoutDoctorReferredTriageNestedInput
    patient?: PatientUpdateOneWithoutTriageRecordsNestedInput
  }

  export type TriageRecordUncheckedUpdateWithoutReceptionistInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    doctorReferredId?: NullableStringFieldUpdateOperationsInput | string | null
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageRecordUncheckedUpdateManyWithoutReceptionistInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    doctorReferredId?: NullableStringFieldUpdateOperationsInput | string | null
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageRecordUpdateWithoutDoctorReferredInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receptionist?: UserUpdateOneRequiredWithoutReceptionistTriageNestedInput
    patient?: PatientUpdateOneWithoutTriageRecordsNestedInput
  }

  export type TriageRecordUncheckedUpdateWithoutDoctorReferredInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageRecordUncheckedUpdateManyWithoutDoctorReferredInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneWithoutBillsNestedInput
    appointment?: AppointmentUpdateOneWithoutBillsNestedInput
  }

  export type BillUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabReportUpdateWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutLabReportsNestedInput
    doctor?: DoctorUpdateOneWithoutLabReportsNestedInput
  }

  export type LabReportUncheckedUpdateWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabReportUncheckedUpdateManyWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutPerformedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetUser?: UserUpdateOneWithoutTargetAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutPerformedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutPerformedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetUserId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutTargetUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    performedBy?: UserUpdateOneRequiredWithoutPerformedAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutTargetUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performedById?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutTargetUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    performedById?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyDoctorInput = {
    id?: string
    patientId: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: string | null
    cancellationReason?: string | null
    cancelledById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionCreateManyDoctorInput = {
    id?: string
    appointmentId: string
    patientId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabReportCreateManyDoctorInput = {
    id?: string
    patientId: string
    testName: string
    testType: string
    reportDate: Date | string
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
    prescription?: PrescriptionUpdateOneWithoutAppointmentNestedInput
    cancelledBy?: UserUpdateOneWithoutCancelledAppointmentsNestedInput
    bills?: BillUpdateManyWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUncheckedUpdateManyWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUpdateOneWithoutPrescriptionNestedInput
    patient?: PatientUpdateOneRequiredWithoutPrescriptionsNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUncheckedUpdateOneWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabReportUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutLabReportsNestedInput
    uploadedBy?: UserUpdateOneRequiredWithoutUploadedLabReportsNestedInput
  }

  export type LabReportUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabReportUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyPatientInput = {
    id?: string
    doctorId: string
    date: Date | string
    timeSlot: JsonNullValueInput | InputJsonValue
    status?: string
    paymentMode?: string
    paymentStatus?: string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: string
    symptoms?: string | null
    notes?: string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: string | null
    cancellationReason?: string | null
    cancelledById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageRecordCreateManyPatientInput = {
    id?: string
    patientName: string
    age: number
    gender: string
    contactNumber: string
    symptoms: string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId: string
    doctorReferredId?: string | null
    status?: string
    diagnosis?: string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    triageId: string
    checkedInAt?: Date | string | null
    checkedOutAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillCreateManyPatientInput = {
    id?: string
    triageId?: string | null
    appointmentId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionCreateManyPatientInput = {
    id?: string
    appointmentId: string
    doctorId: string
    diagnosis: string
    medicines: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: string | null
    followUpDate?: Date | string | null
    receipt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabReportCreateManyPatientInput = {
    id?: string
    testName: string
    testType: string
    reportDate: Date | string
    doctorId?: string | null
    results: JsonNullValueInput | InputJsonValue
    conclusion?: string | null
    recommendations?: string | null
    reportFile: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentsNestedInput
    prescription?: PrescriptionUpdateOneWithoutAppointmentNestedInput
    cancelledBy?: UserUpdateOneWithoutCancelledAppointmentsNestedInput
    bills?: BillUpdateManyWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUncheckedUpdateManyWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    paymentMode?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    consultationType?: StringFieldUpdateOperationsInput | string
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patientDocuments?: NullableJsonNullValueInput | InputJsonValue
    prescriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageRecordUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receptionist?: UserUpdateOneRequiredWithoutReceptionistTriageNestedInput
    doctorReferred?: UserUpdateOneWithoutDoctorReferredTriageNestedInput
  }

  export type TriageRecordUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId?: StringFieldUpdateOperationsInput | string
    doctorReferredId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageRecordUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    contactNumber?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    vitals?: NullableJsonNullValueInput | InputJsonValue
    aiAnalysis?: NullableJsonNullValueInput | InputJsonValue
    receptionistId?: StringFieldUpdateOperationsInput | string
    doctorReferredId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    prescribedMedicines?: NullableJsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triageId?: StringFieldUpdateOperationsInput | string
    checkedInAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedOutAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUpdateOneWithoutBillsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedBillsNestedInput
  }

  export type BillUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUpdateOneWithoutPrescriptionNestedInput
    doctor?: DoctorUpdateOneRequiredWithoutPrescriptionsNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUncheckedUpdateOneWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    medicines?: JsonNullValueInput | InputJsonValue
    tests?: NullableJsonNullValueInput | InputJsonValue
    advice?: NullableStringFieldUpdateOperationsInput | string | null
    followUpDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabReportUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneWithoutLabReportsNestedInput
    uploadedBy?: UserUpdateOneRequiredWithoutUploadedLabReportsNestedInput
  }

  export type LabReportUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabReportUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    testName?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    results?: JsonNullValueInput | InputJsonValue
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    reportFile?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillCreateManyAppointmentInput = {
    id?: string
    patientId?: string | null
    triageId?: string | null
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    tax?: number
    total: number
    status?: string
    dueDate?: Date | string | null
    paymentMethod?: string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneWithoutBillsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedBillsNestedInput
  }

  export type BillUncheckedUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillUncheckedUpdateManyWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    triageId?: NullableStringFieldUpdateOperationsInput | string | null
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDetails?: NullableJsonNullValueInput | InputJsonValue
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DoctorCountOutputTypeDefaultArgs instead
     */
    export type DoctorCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DoctorCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientCountOutputTypeDefaultArgs instead
     */
    export type PatientCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppointmentCountOutputTypeDefaultArgs instead
     */
    export type AppointmentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppointmentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DoctorDefaultArgs instead
     */
    export type DoctorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DoctorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientDefaultArgs instead
     */
    export type PatientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppointmentDefaultArgs instead
     */
    export type AppointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppointmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TriageRecordDefaultArgs instead
     */
    export type TriageRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TriageRecordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BillDefaultArgs instead
     */
    export type BillArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BillDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PrescriptionDefaultArgs instead
     */
    export type PrescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PrescriptionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LabReportDefaultArgs instead
     */
    export type LabReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LabReportDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BedCapacityDefaultArgs instead
     */
    export type BedCapacityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BedCapacityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContactMessageDefaultArgs instead
     */
    export type ContactMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContactMessageDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}