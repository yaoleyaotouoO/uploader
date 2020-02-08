export enum Type {
  Number = 'Number',
  String = 'String',
  Boolean = 'Boolean',
  Object = 'Object',
  Array = 'Array',
  Function = 'Function'
}

export enum PathTypeName {
  Dashboard = '/dashboard',
  Upload = '/upload'
}

export enum HttpStatusType {
  Continue = 100,
  SwitchingProtocol = 101,
  Processing = 102,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultipleChoice = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500
}

export enum KeyCodeType {
  Enter = 13
}

export enum LoadingType {
  TextAttachment = 1,
  Attachment = 2
}