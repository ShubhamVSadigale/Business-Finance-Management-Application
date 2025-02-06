//package com.bfms.service;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.bfms.model.User;
//import com.bfms.repository.UserRepository;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService{
//	
//	@Autowired
//	private UserRepository userRepository;
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		// TODO Auto-generated method stub
//		
////		 User user = userRepository.findByEmail(username);
//////	                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
////
////	        // Convert roles to GrantedAuthority
////	        List<GrantedAuthority> authorities = user.getRoles().stream()
////	                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
////	                .collect(Collectors.toList());
////
////	        // Return Spring Security UserDetails object
////	        return new org.springframework.security.core.userdetails.User(
////	                user.getUsername(),
////	                user.getPassword(),
////	                authorities
////	        );
//		
////		return userDetails;
//		
////        Optional<User> user = userRepository.findByUsername(username);
////        return user.map(UserDetailModel::new).orElseThrow(()->new UsernameNotFoundException("Invalid Username"));
//	
//		User user = userRepository.findByUsername(username)
//	            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//	        
//		List<GrantedAuthority> authorities = user.getRoles().stream()
//		        .map(role -> new SimpleGrantedAuthority(role.getUsername().name()))
//		        .collect(Collectors.toList());
//
//		    return new UserDetailsImpl(
//		        user.getId(), 
//		        user.getUsername(), 
//		        user.getEmail(),
//		        user.getPassword(), 
//		        authorities);
//	}
//
//}
