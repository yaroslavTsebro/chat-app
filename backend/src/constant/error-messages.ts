export class ErrorMessages {
  public static readonly BAD_REQUEST = 'Bad request';
  public static readonly VALIDATION_ERROR = 'Validation error';
  public static readonly ALREADY_HAVE_AN_ACC = 'Already have an account';
  public static readonly ALREADY_INVITED = 'Already invited to the group';
  public static readonly DONT_HAVE_SUCH_ACC = 'Dont have such account';
  public static readonly DONT_HAVE_SUCH_GROUP = 'Dont have such group';
  public static readonly DONT_HAVE_SUCH_TASK_LIST = 'Dont have such task list';
  public static readonly DONT_HAVE_SUCH_PROGRESS = 'Dont have such activity';
  public static readonly YOU_ARE_NOT_INVITED =
    'You are not invited to this group';
  public static readonly USER_THAT_YOU_WANT_TO_ADD_IS_NOT_INVITED =
    'This user is not invited';
  public static readonly USER_ALREADY_IS_ADMIN = 'This user already is admin';
  public static readonly SERVER_ERROR =
    'Something went bad, please describe your situation in letter for us';
  public static readonly SMTP_ERROR =
    'An Error occurred during sending letter to you';
  public static readonly EXPIRED_VERIFICATION_CODE =
    'Cant verify this account because this code have expired';
  public static readonly UNAUTHORIZED = 'Unauthorized';
  public static readonly WRONG_PASS = 'Wrong password';
  public static readonly CODE_NOT_FOUND = 'Code not found';
  public static readonly DATA_NOT_FOUND = 'Data not found';
  public static readonly FORBIDDEN = 'Dont have such access';
  public static readonly ID_IS_NEGATIVE = 'Id must be positive';
  public static readonly OWNER_IS_ALREADY_ADMIN = 'Owner is already admin';
  public static readonly ALREADY_STARTED = 'Task is already started';

  public static readonly SELF_DIALOG_CANT_HAVE_MEMBERS =
    'Self type of group cant have members';
  public static readonly P2P_DIALOG_CANT_HAVE_NOT_2_MEMBERS =
    'P2P dialog cant have more than 2 members or less than 2 memers';
  public static readonly GROUP_NAME_NEED_TO_BE_GREATER_THAN_4 =
    'group name need to be greater than 4';
  public static readonly PUBLIC_GROUP_NEED_TO_HAVE_NAME =
    'group need to have name';
}
