
package com.capstoneproject.themeal.model.entity;

import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;

public class CustomOidcUser extends DefaultOidcUser {
    private final User user;

    public CustomOidcUser(OidcUser oidcUser, User user) {
        super(oidcUser.getAuthorities(), oidcUser.getIdToken(), oidcUser.getUserInfo());
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
