import React from 'react';
import { Button } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Banner = () => {
  const router = useRouter();
  const showBanner = router.pathname === '/main' ? false : true;
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>A Secure Way</h1>
                <h1>To Manage Funds</h1>
                <h1></h1>
                {showBanner == true ? (
                  <p>Start By Logging in with your account</p>
                ) : (
                  <p>Start By Creating a Campaign</p>
                )}
                <Link
                  href={
                    showBanner == true ? '/projects/login' : '/projects/new'
                  }
                >
                  <Button
                    className="massive ui inverted button"
                    content={showBanner == true ? 'Login' : 'Create Campaign'}
                    icon="add circle"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Banner;
