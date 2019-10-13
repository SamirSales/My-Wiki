package io.github.samirsales.controller;

import io.github.samirsales.model.dto.UserDTO;
import io.github.samirsales.exception.UserUpdateException;
import io.github.samirsales.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users")
@SuppressWarnings("unused")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasAnyRole('ADMIN')")
    @RequestMapping(method = RequestMethod.GET)
    public List<UserDTO> getAll(){
        return userService.getAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getById(@PathVariable("id") long id){
        try {
            return new ResponseEntity<>(userService.getById(id), HttpStatus.OK);
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/authenticated", method = RequestMethod.GET)
    public UserDTO getAuthenticatedUser(){
        return userService.getAuthenticatedUser();
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteById(@PathVariable("id") long id){
        try {
            userService.deleteById(id);
            return new ResponseEntity<>("The user's password has been deleted successfully", HttpStatus.OK);
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void update(@RequestBody UserDTO userDTO){
        userService.update(userDTO);
    }

    final private String PASSWORD_UPDATED_SUCCESSFULLY_MESSAGE = "The user's password has been deleted successfully";

    @RequestMapping(value = "/update_authenticated", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object>  updateAuthenticatedUser(@RequestBody UserDTO authenticatedUserDTO){

        try{
            userService.getUpdatedAuthenticatedUserByDTO(authenticatedUserDTO);
        }catch (UserUpdateException ex){
            ex.printStackTrace();
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); //TODO
        }
        return new ResponseEntity<>(PASSWORD_UPDATED_SUCCESSFULLY_MESSAGE, HttpStatus.OK);
    }

    @RequestMapping(value = "/update_password",
        method = RequestMethod.PUT,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> updateUserPassword(
        @RequestParam("currentPassword") String currentPassword,
        @RequestParam("newPassword") String newPassword){

        userService.setUserPassword(currentPassword, newPassword); //TODO
        return new ResponseEntity<>(PASSWORD_UPDATED_SUCCESSFULLY_MESSAGE, HttpStatus.OK);
    }

    @RequestMapping(value = "/update_picture",
        method = RequestMethod.PUT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public UserDTO uploadImageFile(@RequestParam("file") MultipartFile file) throws Exception {
        return userService.userPicture(file);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody UserDTO userDTO){
        userService.create(userDTO);
    }
}