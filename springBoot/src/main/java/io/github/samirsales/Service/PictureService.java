package io.github.samirsales.Service;

import io.github.samirsales.Dao.PictureDao;
import io.github.samirsales.Entity.Picture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service
public class PictureService {

    @Autowired
    @Qualifier("fakeData")
    private PictureDao pictureDao;

    public Picture getPictureById(Long id) {
        return pictureDao.getPictureById(id);
    }

    public List<Picture> getAll() {
        return pictureDao.getAll();
    }

    public List<Picture> getPicturesBySearch(String search) {
        return pictureDao.getPicturesBySearch(search);
    }

    public Picture insertPicture(Picture picture) {
        return pictureDao.insertPicture(picture);
    }

    public void removePictureById(long id) {
        pictureDao.removePictureById(id);
    }

    public void updatePicture(Picture picture) {
        pictureDao.updatePicture(picture);
    }

    public String getFileExtension(String fullName) {
        if(fullName.isEmpty()){
            return "";
        }
        String fileName = new File(fullName).getName();
        int dotIndex = fileName.lastIndexOf('.');
        return (dotIndex == -1) ? "" : fileName.substring(dotIndex + 1);
    }
}