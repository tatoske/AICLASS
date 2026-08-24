package com.aiclass.api.service;

import com.aiclass.api.model.User;
import com.aiclass.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        // En una implementación real se encriptaría la contraseña aquí si existiera
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setRole(userDetails.getRole());
            user.setDocumentType(userDetails.getDocumentType());
            user.setDocumentNumber(userDetails.getDocumentNumber());
            user.setEmail(userDetails.getEmail());
            user.setPhone(userDetails.getPhone());
            user.setBirthDate(userDetails.getBirthDate());
            user.setGender(userDetails.getGender());
            user.setCountry(userDetails.getCountry());
            user.setDepartment(userDetails.getDepartment());
            user.setMunicipality(userDetails.getMunicipality());
            user.setCommune(userDetails.getCommune());
            user.setNeighborhood(userDetails.getNeighborhood());
            user.setAddress(userDetails.getAddress());
            user.setEps(userDetails.getEps());
            user.setMaritalStatus(userDetails.getMaritalStatus());
            user.setCapabilitiesDisabilities(userDetails.getCapabilitiesDisabilities());
            user.setConflictStatus(userDetails.getConflictStatus());
            user.setProfessionalTitle(userDetails.getProfessionalTitle());
            user.setPosition(userDetails.getPosition());
            user.setTransportSubsidy(userDetails.getTransportSubsidy());
            user.setRestaurantSubsidy(userDetails.getRestaurantSubsidy());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
