using System.ComponentModel.DataAnnotations;
public class SignInDto {
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Wrong Format")]
    public string Email {get;set;} = null!;
    [Required(ErrorMessage = "Password is requrired")]
    public string Password {get;set;} = null!;
}
