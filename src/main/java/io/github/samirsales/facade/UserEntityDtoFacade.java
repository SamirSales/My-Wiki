package io.github.samirsales.facade;

import io.github.samirsales.dao.RoleDao;
import io.github.samirsales.dao.UserDao;
import io.github.samirsales.model.dto.RoleDTO;
import io.github.samirsales.model.dto.user.UserCreationDTO;
import io.github.samirsales.model.dto.user.UserDTO;
import io.github.samirsales.model.entity.ImageEntity;
import io.github.samirsales.model.entity.RoleEntity;
import io.github.samirsales.model.entity.UserEntity;
import io.github.samirsales.util.TextEncryption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserEntityDtoFacade {

    @Autowired
    @SuppressWarnings("unused")
    private UserDao userDao;

    @Autowired
    @SuppressWarnings("unused")
    private RoleDao roleDao;

    public UserEntity getActiveEntitySetByDTO(UserCreationDTO userCreationDTO) {
        final Long id = null;
        final boolean isActiveUser = true;
        String password = getMD5EncryptedText(userCreationDTO.getPassword());
        Set<RoleEntity> roleEntitySet = getSetOfRoleEntitiesBySetOfRoleDTOs(userCreationDTO.getRoles());
        final ImageEntity imageProfile = null;

        return new UserEntity(
                id,
                userCreationDTO.getName(),
                userCreationDTO.getUsername(),
                userCreationDTO.getEmail(),
                isActiveUser,
                password,
                userCreationDTO.getGender(),
                roleEntitySet,
                imageProfile
        );
    }

    public UserEntity getActiveEntitySetByIdAndDTO(Long idEntity, UserDTO userDTO){
        String password = getEncryptedPasswordByUserDTO(userDTO);
        final boolean isActiveUser = true;
        Set<RoleEntity> roleEntitySet = getSetOfRoleEntitiesBySetOfRoleDTOs(userDTO.getRoles());
        final ImageEntity imageProfile = null;

        return new UserEntity(
                idEntity,
                userDTO.getName(),
                userDTO.getUsername(),
                userDTO.getEmail(),
                isActiveUser,
                password,
                userDTO.getGender(),
                roleEntitySet,
                imageProfile
        );
    }

    private Set<RoleEntity> getSetOfRoleEntitiesBySetOfRoleDTOs(Set<RoleDTO> roleDTOs){
        Set<RoleEntity> roleEntitySet = new HashSet<>();

        Optional<RoleEntity> optionalRoleEntity;
        for(RoleDTO roleDTO : roleDTOs){
            optionalRoleEntity = roleDao.getEntityByRole(roleDTO.getRole());
            optionalRoleEntity.ifPresent(roleEntitySet::add);
        }

        return roleEntitySet;
    }

    private String getEncryptedPasswordByUserDTO(UserDTO userDTO){
        boolean shouldSetPassword = userDTO.getPassword() != null && !userDTO.getPassword().isEmpty();

        if(shouldSetPassword){
            return getMD5EncryptedText(userDTO.getPassword());
        }

        if(userDTO.getId() != null){
            Optional<UserEntity> userEntityOptional = userDao.getById(userDTO.getId());

            if(userEntityOptional.isPresent()){
                UserEntity userEntity = userEntityOptional.get();
                return userEntity.getPassword();
            }
        }

        return "";
    }

    private String getMD5EncryptedText(String text){
        TextEncryption textEncryption = new TextEncryption();
        return textEncryption.getMD5(text);
    }
}
