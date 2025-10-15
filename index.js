    // AOS Animation Library
    
    

        // Initialize AOS
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });

        // Form Validation
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset errors
            document.querySelectorAll('.error').forEach(error => {
                error.style.display = 'none';
            });
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('error-input');
            });
            
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                document.getElementById('nameError').style.display = 'block';
                name.classList.add('error-input');
                isValid = false;
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                document.getElementById('emailError').style.display = 'block';
                email.classList.add('error-input');
                isValid = false;
            }
            
            // Validate package
            const package = document.getElementById('package');
            if (!package.value) {
                document.getElementById('packageError').style.display = 'block';
                package.classList.add('error-input');
                isValid = false;
            }
            
            // Validate message
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                document.getElementById('messageError').style.display = 'block';
                message.classList.add('error-input');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                document.getElementById('successMessage').style.display = 'block';
                
                // Reset form
                document.getElementById('contactForm').reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('successMessage').style.display = 'none';
                }, 5000);
            }
        });