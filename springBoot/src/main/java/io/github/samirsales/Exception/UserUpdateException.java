package io.github.samirsales.Exception;

public class UserUpdateException extends RuntimeException {

    public UserUpdateException(String msg){
        super(msg);
    }

    public UserUpdateException(String msg, Throwable cause){
        super(msg, cause);
    }
}
