
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
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

exports.Prisma.DoctorScalarFieldEnum = {
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

exports.Prisma.PatientScalarFieldEnum = {
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

exports.Prisma.AppointmentScalarFieldEnum = {
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

exports.Prisma.TriageRecordScalarFieldEnum = {
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

exports.Prisma.BillScalarFieldEnum = {
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

exports.Prisma.PrescriptionScalarFieldEnum = {
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

exports.Prisma.LabReportScalarFieldEnum = {
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

exports.Prisma.AuditLogScalarFieldEnum = {
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

exports.Prisma.BedCapacityScalarFieldEnum = {
  id: 'id',
  department: 'department',
  totalBeds: 'totalBeds',
  occupiedBeds: 'occupiedBeds',
  icuBeds: 'icuBeds',
  occupiedIcuBeds: 'occupiedIcuBeds',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContactMessageScalarFieldEnum = {
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

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
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

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
