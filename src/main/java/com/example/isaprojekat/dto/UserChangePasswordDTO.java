package com.example.isaprojekat.dto;

import javax.validation.constraints.Pattern;

public class UserChangePasswordDTO {

        private String email;
        private String oldPassword;
        @Pattern(regexp = "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$")
        private String password;
        private String passwordConfirm;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getOldPassword() {
                return oldPassword;
        }
        public void setOldPassword(String oldPassword) {
            this.oldPassword = oldPassword;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
        public String getPasswordConfirm() {
            return passwordConfirm;
        }
        public void setPasswordConfirm(String passwordConfirm) {
            this.passwordConfirm = passwordConfirm;
        }
}


