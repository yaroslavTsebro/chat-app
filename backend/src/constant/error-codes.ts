export class ErrorCodes {
  public static readonly BAD_REQUEST = 40000;
  public static readonly VALIDATION_ERROR = 40401;
  public static readonly ALREADY_HAVE_AN_ACC = 40402;
  public static readonly DONT_HAVE_SUCH_ACC = 40403;
  public static readonly ALREADY_INVITED = 40499;
  public static readonly DONT_HAVE_SUCH_GROUP = 40404;
  public static readonly DONT_HAVE_SUCH_TASK_LIST = 40405;
  public static readonly DONT_HAVE_SUCH_PROGRESS = 40406;
  public static readonly YOU_ARE_NOT_INVITED = 40444;
  public static readonly USER_THAT_YOU_WANT_TO_ADD_IS_NOT_INVITED = 40445;
  public static readonly USER_ALREADY_IS_ADMIN = 40455;
  public static readonly SERVER_ERROR = 50099;
  public static readonly EXPIRED_VERIFICATION_CODE = 40100;
  public static readonly UNAUTHORIZED = 40101;
  public static readonly WRONG_PASS = 40102;
  public static readonly CODE_NOT_FOUND = 40103;
  public static readonly DATA_NOT_FOUND = 40444;
  public static readonly FORBIDDEN = 40333;
  public static readonly OWNER_IS_ALREADY_ADMIN = 40999;
  public static readonly ALREADY_STARTED = 40991;

  public static readonly SELF_DIALOG_CANT_HAVE_MEMBERS = 40001;
  public static readonly P2P_DIALOG_CANT_HAVE_NOT_2_MEMBERS = 40002;
  public static readonly GROUP_NAME_NEED_TO_BE_GREATER_THAN_4 = 40003;
  public static readonly PUBLIC_GROUP_NEED_TO_HAVE_NAME = 40004;
}
