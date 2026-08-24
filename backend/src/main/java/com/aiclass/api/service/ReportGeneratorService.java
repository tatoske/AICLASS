package com.aiclass.api.service;

import com.aiclass.api.model.User;
import com.aiclass.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportGeneratorService {

    private final UserRepository userRepository;

    @Autowired
    public ReportGeneratorService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String generateUsersCsvReport() {
        List<User> users = userRepository.findAll();
        StringBuilder csv = new StringBuilder();
        
        // Cabeceras
        csv.append("ID,Nombre,Rol,Tipo_Doc,Num_Doc,Email,Telefono,Fecha_Nacimiento,Genero,Pais,Departamento,Municipio,EPS,Discapacidad\n");
        
        // Filas
        for (User user : users) {
            csv.append(String.format("%d,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s\n",
                    user.getId(),
                    escapeCsv(user.getName()),
                    user.getRole(),
                    user.getDocumentType(),
                    user.getDocumentNumber(),
                    escapeCsv(user.getEmail()),
                    escapeCsv(user.getPhone()),
                    user.getBirthDate() != null ? user.getBirthDate().toString() : "",
                    user.getGender(),
                    escapeCsv(user.getCountry()),
                    escapeCsv(user.getDepartment()),
                    escapeCsv(user.getMunicipality()),
                    escapeCsv(user.getEps()),
                    escapeCsv(user.getCapabilitiesDisabilities())
            ));
        }
        
        return csv.toString();
    }
    
    public byte[] generatePazYSalvo(Long studentId) {
        // En un caso real, esto usaría iTextPDF o Apache PDFBox para generar un binario PDF real.
        // Aquí retornaremos un texto simple en bytes para simular la descarga.
        User student = userRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
            
        String content = "COLEGIO AICLASS\n\n" +
                         "CERTIFICADO DE PAZ Y SALVO\n\n" +
                         "Por medio de la presente se certifica que el estudiante " + student.getName() + " " +
                         "identificado con " + student.getDocumentType() + " " + student.getDocumentNumber() + " " +
                         "se encuentra a PAZ Y SALVO por todo concepto financiero y académico con la institución.\n\n" +
                         "Emitido para trámites legales a solicitud del interesado.";
                         
        return content.getBytes();
    }
    
    public byte[] generateStudentCarnet(Long studentId) {
        User student = userRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
            
        String content = "-------------------------------\n" +
                         "|       CARNET AICLASS        |\n" +
                         "-------------------------------\n" +
                         "| Nombre: " + student.getName() + "\n" +
                         "| Rol:    " + student.getRole() + "\n" +
                         "| ID:     " + student.getDocumentNumber() + "\n" +
                         "| EPS:    " + student.getEps() + "\n" +
                         "-------------------------------";
                         
        return content.getBytes();
    }

    private String escapeCsv(String data) {
        if (data == null) return "";
        if (data.contains(",") || data.contains("\"") || data.contains("\n")) {
            return "\"" + data.replace("\"", "\"\"") + "\"";
        }
        return data;
    }
}
